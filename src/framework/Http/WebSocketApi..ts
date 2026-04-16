import HTTPTransport from "./HTTPTransport";

export interface SocketResponse{
    type: string;
    [key: string]: unknown;
}

export interface SocketRequest{
    content: string;
    type: string;
}

type response<T> = T | T[];

interface Token{
    token: string;
}

export default class WebSocketApi{
    private static instance: WebSocketApi;
    private socket: WebSocket | null = null;
    private isReconnecting = false;
    private reconnectAttempts = 0;
    private maxReconnectAttempts = 5;
    private reconnectDelay = 1000; // начальная задержка 1 сек
    private token: string = "";
    private transport = new HTTPTransport('api/v2');
    private static onMessagesReceived: ((response: response<SocketResponse>) => void) | null = null;

    private constructor(){}

    public static getInstance(onMessagesReceived: any): WebSocketApi {
        WebSocketApi.onMessagesReceived = onMessagesReceived;
        if (!WebSocketApi.instance) {
            WebSocketApi.instance = new WebSocketApi();
        }
        return WebSocketApi.instance;
    }

    public async start(chatId: number, userId: number){
        try {
            const tokenObj = await this.getToken(chatId);
            this.token = tokenObj.token;
            return this.connect(chatId, userId);
        } catch (e) {
            console.log(e);
            return;
        }
    }

    public async send(data: SocketRequest){
        if(!this.socket){
            console.log("Сокет не найден");
            return;
        }
        await this.socket.send(JSON.stringify(data))
    }

    private getToken(chatId: number): Promise<Token>{
        return this.transport.post(`/chats/token/${chatId}`);
    }

    public openHandler=()=>{
        console.log('Соединение установлено');
        this.reconnectAttempts = 0; // сброс счётчика при успехе
        this.isReconnecting = false;

        //сообщить, что полключились
        this.pingConection();
    }

    protected closeHandler = (event: CloseEvent, chatId: number, userId: number)=>{
        if (!event.wasClean) {
            console.log('Обрыв соединения. Попытка реконнекта...');
            this.startReconnect(chatId, userId);
        } else {
            console.log('Соединение закрыто чисто');
        }
        console.log(`Код: ${event.code} | Причина: ${event.reason}`);
    }

    protected messageHandler = (event: MessageEvent)=>{
        console.log('Получены данные', event.data);
        if(event.data){
            try{
                const response = JSON.parse(event.data);
                if(WebSocketApi.onMessagesReceived ){
                    WebSocketApi.onMessagesReceived(response);
                }
            }
            catch(e){
                console.error("Не удалось распарсить", e)
            }
        }
    }

    protected errorHandler = (event: Event)=>{
        console.log('Ошибка', event);
    }

    private pingConection = ()=>{
        setInterval(() => this.socket?.send(
            JSON.stringify({type: "ping"})
        ), 30000);
    }

    private connect=(chatId: number, userId: number)=> {
        if (this.isReconnecting) return;

        this.socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${this.token}`);

        this.socket.addEventListener('open', this.openHandler);

        this.socket.addEventListener('close', event => {
            // Отключаем все обработчики, чтобы избежать утечек памяти
            this.socket?.removeEventListener('open', this.openHandler);
            this.socket?.removeEventListener('message', this.messageHandler);
            this.socket?.removeEventListener('error', this.errorHandler);
            this.socket = null;

            this.closeHandler(event, chatId, userId);
        });

        this.socket.addEventListener('message', this.messageHandler);

        this.socket.addEventListener('error', this.errorHandler);
    }

    private startReconnect(chatId: number, userId: number) {
        if (this.reconnectAttempts >= this.maxReconnectAttempts) {
            console.log('Достигнут лимит попыток реконнекта');
            return;
        }

        this.isReconnecting = true;
        this.reconnectAttempts++;

        const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1); // экспоненциальная задержка

        setTimeout(() => {
            console.log(`Попытка реконнекта #${this.reconnectAttempts} через ${delay} мс`);
            this.connect(chatId, userId);
        }, delay);
    }

    public closeConnection(code: number = 1000, reason: string = 'Закрытие соединения по запросу клиента') {
        if (this.socket) {
            if (this.socket.readyState === WebSocket.OPEN) {
                this.socket.close(code, reason);
            } else if (this.socket.readyState === WebSocket.CONNECTING) {
                // Если соединение устанавливается, ждём открытия перед закрытием
                this.socket.addEventListener('open', () => {
                    this.socket?.close(code, reason);
                });
            }
            // Если состояние CLOSING или CLOSED — ничего не делаем
        }

        // Сбрасываем состояние реконнекта
        this.isReconnecting = false;
        this.reconnectAttempts = 0;
    }
}
