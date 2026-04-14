import { BaseAPI } from "../framework/Http/BaseApi";
import Store from "../framework/store/Store";
import ChatsApi from "./chatsApi";

export default class MessagesApi extends BaseAPI {
    private chatsApi = new ChatsApi();
    private token: string = "";
    private socket: WebSocket | null = null;
    private isReconnecting = false;
    private reconnectAttempts = 0;
    private maxReconnectAttempts = 5;
    private reconnectDelay = 1000; // начальная задержка 1 сек

   async start(chatId: number, userId: number) {
        try {
            const tokenObj = await this.chatsApi.getToken(chatId);
            this.token = tokenObj.token;
            this.connect(chatId, userId);
        } catch (e) {
            console.log(e);
            return;
        }
    }

    private connect(chatId: number, userId: number) {
        if (this.isReconnecting) return;

        this.socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${this.token}`);

        this.socket.addEventListener('open', () => {
            console.log('Соединение установлено');
            this.reconnectAttempts = 0; // сброс счётчика при успехе
            this.isReconnecting = false;

            this.socket?.send(
                JSON.stringify({
                    content: '0',
                    type: 'get old',
                })
            );

            setInterval(() => this.socket?.send(
                JSON.stringify({type: "ping"})
            ), 30000);
        });

        this.socket.addEventListener('close', event => {
            if (!event.wasClean) {
                console.log('Обрыв соединения. Попытка реконнекта...');
                this.startReconnect(chatId, userId);
            } else {
                console.log('Соединение закрыто чисто');
            }
            console.log(`Код: ${event.code} | Причина: ${event.reason}`);
        });

        this.socket.addEventListener('message', event => {
            console.log('Получены данные', event.data);
            if(event.data){
                try{
                    const response = JSON.parse(event.data);
                    if(Array.isArray(response)){
                        Store.setState("messages", response);
                    }
                }
                catch(e){
                    console.error("Не удалось распарсить", e)
                }
            }

        });

        this.socket.addEventListener('error', event => {
            console.log('Ошибка', event);
        });
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
}

