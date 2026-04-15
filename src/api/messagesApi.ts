import { trim } from "../utils/trim";
import ChatsApi from "./chatsApi";

export interface socketResponse{
    type: string;
    [key: string]: unknown;
}

export interface socketRequest{
    message: string;
}

type response<T> = T | T[];

export default class MessagesApi  {
    private chatsApi = new ChatsApi();
    private token: string = "";
    private socket: WebSocket | null = null;
    private isReconnecting = false;
    private reconnectAttempts = 0;
    private maxReconnectAttempts = 5;
    private reconnectDelay = 1000; // начальная задержка 1 сек

    private onMessagesReceived: ((response: response<socketResponse>) => void) | null = null;

    public setOnMessagesReceived(callback: (response: response<socketResponse>) => void) {
        this.onMessagesReceived = callback;
    }

    public async start(chatId: number, userId: number) {
        try {
            const tokenObj = await this.chatsApi.getToken(chatId);
            this.token = tokenObj.token;
            return this.connect(chatId, userId);
        } catch (e) {
            console.log(e);
            return;
        }
    }

    protected openHandler=()=>{
        console.log('Соединение установлено');
        this.reconnectAttempts = 0; // сброс счётчика при успехе
        this.isReconnecting = false;

        this.getMessages();
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
                if(this.onMessagesReceived ){
                    this.onMessagesReceived(response);
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

    protected getMessages = ()=>{
        this.socket?.send(
            JSON.stringify({
                content: '0',
                type: 'get old'
            })
        );
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

    public async send(data: socketRequest | null){
        if(!data || !data.message) return;

        await this.socket?.send(JSON.stringify({
            content: data.message,
            type: 'message'
        }))
    }
}

