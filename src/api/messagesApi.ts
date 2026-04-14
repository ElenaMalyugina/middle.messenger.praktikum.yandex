import { BaseAPI } from "../framework/Http/BaseApi";
import Store from "../framework/store/Store";
import ChatsApi from "./chatsApi";

export default class MessagesApi extends BaseAPI {
    private chatsApi = new ChatsApi();
    private token: string = "";

    async start(chatId: number, userId: number){
        try{
            const tokenObj = await this.chatsApi.getToken(chatId);
            this.token = tokenObj.token;
        }
        catch(e){
            console.log(e)
            return
        }

        const socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${this.token}`);

        socket.addEventListener('open', () => {
            console.log('Соединение установлено');

            socket.send(
                JSON.stringify({
                content: '0',
                type: 'get old',
            }))



            /*socket.send(JSON.stringify({
                content: 'Моё первое сообщение миру!',
                type: 'message',
            }));*/
        });

        socket.addEventListener('close', event => {
            if (event.wasClean) {
                console.log('Соединение закрыто чисто');
            } else {
                console.log('Обрыв соединения');
            }

            console.log(`Код: ${event.code} | Причина: ${event.reason}`);
        });

        socket.addEventListener('message', event => {
            console.log('Получены данные', event.data);
            const messages = JSON.parse(event.data);
            Store.setState("messages", messages);
        });

        socket.addEventListener('error', event => {
            console.log('Ошибка', event);
        });
    }
}

