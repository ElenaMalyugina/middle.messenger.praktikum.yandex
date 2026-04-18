import MessagesApi from "../api/messagesApi";
import type { SocketRequest, SocketResponse } from "../framework/Http/WebSocketApi";
import Store from "../framework/store/Store";
import { errorHandler } from "../services/errorHandler";
import { UserService } from "../services/userService";
import type { MessageFile } from "../types/file";
import { MessageModel, type Message, type MessageForSend } from "../types/message";
import BaseFormController from "./baseFormController";

export default class MessagesController extends BaseFormController<MessageForSend>{
    private messagesApi: MessagesApi;

    constructor(){
        super();
        this.messagesApi = new MessagesApi(this.getMessagesHandler.bind(this));
    }

    startConnection(chatId: number){
        const currentUser = UserService.getCurrentUser();
        if(!currentUser) return;

        this.messagesApi.start(chatId, currentUser)
            .then(() => {
                console.log('Соединение установлено, запрашиваем историю сообщений');
                this.getMessages(0);
            })
            .catch(error => {
                console.error('Ошибка подключения:', error);
                Store.setState("connectionError", errorHandler(error));
            });
    }

    closeConnection(){
        this.messagesApi.close();
    }

    getMessages = (count: number = 0)=>{
        if(count == 0){
            Store.setState("messages", []);
        }

        this.messagesApi.getMessages(count);
    }

    protected getMessagesHandler = (response: SocketResponse)=>{
        console.log('Получено сообщение от сокета:', response);
        if(Array.isArray(response)){
            if(response.length == 0){
                Store.setState("messagesError", "Пока нет новых сообщений");

                setTimeout(()=>{
                    Store.setState("messagesError", "");
                }, 3000)
                return;
            }
            const messagesArray = response.map(mess => new MessageModel(mess));
            const messagesArrayReversed = messagesArray.reverse();
            const oldMessages = Store.getState().messages as Message[] || [];
            Store.setState("messages", [...messagesArrayReversed, ...oldMessages]);
        }
        else if(response.type == "message" || response.type == "file"){
            const oldMessages = Store.getState().messages as Message[];
            const newMessage = new MessageModel(response);
            Store.setState("messages", [...oldMessages, newMessage] )
        }
    }

    protected formSend = (data: MessageForSend | null)=>{
        if(!data) return;

        const preparedData: SocketRequest = {
            type: data.type || "message",
            content: data.message
        }

        return this.messagesApi.send(preparedData);
    };

    async uploadFile(file: File){
        try{
            const formData = new FormData();
            formData.append('resource', file);
            const uploadedFile = await this.messagesApi.sendFile(formData);
            if(!uploadedFile ) return;

            this.formSend({
                message: (uploadedFile as MessageFile).id,
                type: "file"
            })
        }
        catch(error){
            const parsedError = errorHandler(error);
            Store.setState("MessageFileError", parsedError);
        }
    }
}
