import HTTPTransport from "./HTTPTransport";

export interface SocketResponse {
    type: string;
    [key: string]: unknown;
}

export interface SocketRequest {
    content: string;
    type: string;
}

interface Token {
    token: string;
}

window.sockets = [];

export default class WebSocketApi {
    private static instance: WebSocketApi;
    private socket: WebSocket | null = null;
    private isReconnecting = false;
    private reconnectAttempts = 0;
    private maxReconnectAttempts = 5;
    private reconnectDelay = 1000;
    private chatId: number = -1;
    private userId: number = -1;
    private token: string = "";
    private transport = new HTTPTransport('api/v2');
    private messageBuffer: SocketRequest[] = [];
    private pingInterval: number | null = null; // в браузере — number
    private static onMessagesReceived: ((response: SocketResponse) => void) | null = null;

    private url = "wss://ya-praktikum.tech/ws/chats/";

    private constructor() {}

    public static getInstance(onMessagesReceived: (response: SocketResponse) => void): WebSocketApi {
        WebSocketApi.onMessagesReceived = onMessagesReceived;
        if (!WebSocketApi.instance) {
            WebSocketApi.instance = new WebSocketApi();
        }
        return WebSocketApi.instance;
    }

    public async start(chatId: number, userId: number): Promise<void> {
        if(this.socket){
            await this.closeConnection();
        }
        return await this.startConnect(chatId, userId);
    }

    private async startConnect(chatId: number, userId: number){
        try {
            if(window.sockets && window.sockets.length){
                window.sockets.forEach(socket =>{
                    socket.close();
                })
            }

            const tokenObj = await this.getToken(chatId);
            this.token = tokenObj.token;
            this.chatId = chatId;
            this.userId = userId;
            return this.connect();
        } catch (e) {
            console.error("Ошибка при старте WebSocket:", e);
            return;
        }
    }

    public send(data: SocketRequest): void{
        if (!this.socket ) {
            this.addMessagesInBuffer(data);
            return;
        }

        switch (this.socket.readyState) {
            case WebSocket.OPEN:
                this.socket.send(JSON.stringify(data));
                break;
            case WebSocket.CONNECTING:
                this.addMessagesInBuffer(data)
                break;
        }
    }

    private addMessagesInBuffer = (data: SocketRequest)=>{
        //Предотвращаем бескконечное добавление
        if(this.messageBuffer.length < 6){
            this.messageBuffer.push(data);
        }
        else{
            const bufferOverflowMessage = {
                type: "bufferOverflow"
            }
            if (WebSocketApi.onMessagesReceived) {
                WebSocketApi.onMessagesReceived(bufferOverflowMessage);
            }
        }
    }

    private getToken(chatId: number): Promise<Token> {
        return this.transport.post(`/chats/token/${chatId}`);
    }

    openHandler = (): void => {
        const connectMessage = {
            type: "connected"
        }

        if (WebSocketApi.onMessagesReceived) {
            WebSocketApi.onMessagesReceived(connectMessage);
        }

        this.reconnectAttempts = 0;
        this.isReconnecting = false;

        // Отправляем все сообщения из буфера
        while (this.messageBuffer.length > 0) {
            const data = this.messageBuffer.shift();
            if (data) {
                this.send(data);
            }
        }

        this.pingConnection();
    };

    protected closeHandler = (event: CloseEvent): void => {
        if (!event.wasClean) {
            this.startReconnect();
        }
    };

    protected messageHandler = (event: MessageEvent): void => {
        if (event.data) {
            try {
                const response = JSON.parse(event.data) as SocketResponse;
                if (WebSocketApi.onMessagesReceived) {
                    WebSocketApi.onMessagesReceived(response);
                }
            } catch (e) {
                const response = {type: "error"}
                //возможно, протух токен?
                this.start(this.chatId, this.userId);
            }
        }
    };

    protected errorHandler = (event: Event): void => {
        console.error('Ошибка WebSocket', event);
    };

    private pingConnection = (): void => {
        // Очистка предыдущего интервала
        if (this.pingInterval !== null) {
            clearInterval(this.pingInterval);
        }

        this.pingInterval = window.setInterval(() => {
            if (this.socket && this.socket.readyState === WebSocket.OPEN) {
                this.socket.send(JSON.stringify({ type: "ping" }));
            }
        }, 10000);
    }

    private connect = (): void => {
        this.cleanupSocket();
        this.socket = new WebSocket(`${this.url}${this.userId}/${this.chatId}/${this.token}`);
        window.sockets.push(this.socket);

        this.socket.addEventListener('open', this.openHandler);
        this.socket.addEventListener('message', this.messageHandler);
        this.socket.addEventListener('error', this.errorHandler);

        this.socket.addEventListener('close', (event) => {
            this.cleanupSocket();
            this.closeHandler(event);
        });
    }

    private cleanupSocket(): void {
        if (this.socket) {
            this.socket.removeEventListener('open', this.openHandler);
            this.socket.removeEventListener('message', this.messageHandler);
            this.socket.removeEventListener('error', this.errorHandler);

            this.socket = null;
        }

        // Останавливаем пинг
        if (this.pingInterval !== null) {
            clearInterval(this.pingInterval);
            this.pingInterval = null;
        }

    }

    private startReconnect(): void {
        if (this.isReconnecting) {
            return;
        }

        if (this.reconnectAttempts >= this.maxReconnectAttempts) {
            const reconnectMessage = {
                type: "reconnect failed"
            }

            if (WebSocketApi.onMessagesReceived) {
                WebSocketApi.onMessagesReceived(reconnectMessage);
            }

            return
        }

        this.isReconnecting = true;
        this.reconnectAttempts++;

        const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1);

        setTimeout(() => {
            const reconnectMessage = {
                type: "reconnect trying"
            }

            if (WebSocketApi.onMessagesReceived) {
                WebSocketApi.onMessagesReceived(reconnectMessage);
            }

            this.closeConnection().then(() => {
                // Только после полного закрытия начинаем новое подключение
                this.connect();
            });

        }, delay);
    }

    public closeConnection(code: number = 1000, reason: string = 'Закрытие по запросу клиента'): Promise<void> {
        return new Promise((resolve) => {
            this.isReconnecting = false;
            this.reconnectAttempts = 0;

            if (!this.socket) {
                resolve();
                return;
            }

            // Функция для полной очистки
            const cleanupAndResolve = () => {
                this.cleanupSocket();
                resolve();
            };

            // Если сокет уже закрыт, сразу очищаем
            if (this.socket.readyState === WebSocket.CLOSED) {
                cleanupAndResolve();
                return;
            }

            // Подписываемся на событие close с флагом once
            this.socket.addEventListener('close', cleanupAndResolve, { once: true });

            // Если соединение открыто, инициируем закрытие
            if (this.socket.readyState === WebSocket.OPEN) {
                this.socket.close(code, reason);
            }
            else if (this.socket.readyState === WebSocket.CONNECTING) {
                // Если устанавливается, ждём открытия и закрываем
                this.socket.addEventListener('open', () => {
                    this.socket?.close(code, reason);
                }, { once: true });
            }
            else {
            // Для других состояний (CLOSING) просто очищаем
                cleanupAndResolve();
            }
        });
    }
}
