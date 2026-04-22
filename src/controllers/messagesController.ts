import MessagesApi from "../api/messagesApi";
import type { SocketRequest, SocketResponse } from "../framework/Http/WebSocketApi";
import Store from "../framework/store/Store";
import { errorHandler } from "../services/errorHandler";
import { UserService } from "../services/userService";
import type { MessageFile } from "../types/file";
import { MessageModel, type Message, type MessageForSend } from "../types/message";
import BaseFormController from "./baseFormController";

class MessagesController extends BaseFormController<MessageForSend>{
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

        //получение новых сообщений
        if(Array.isArray(response)){
            this.onGetMessagesHandler(response);
        }
        //отправили собщение
        else if(response.type == "message" || response.type == "file"){
            this.onSendMessageCallback(response);
        }
        //завалили реконнект, предлагаем перезагруз страницыы
        else if(response.type == "reconnect failed"){
            Store.setState("isLoaderActive", true);
        }
        //пытаемся восстановить соединение
        else if(response.type == "reconnect trying"){
            Store.setState("isLoaderActive", true);
        }
        //установлено соединение
        else if(response.type == "connected"){
            Store.setState("isLoaderActive", false);
        }
    }

    private onGetMessagesHandler = (rawMessages: SocketResponse[])=>{
        if(rawMessages.length == 0){
            Store.setState("messagesError", "Больше сообщений нет");
            setTimeout(()=>{
                Store.setState("messagesError", "");
            }, 3000)
            return;
        }

        const messagesArray = rawMessages.map(mess => new MessageModel(mess));
        const messagesArrayReversed = messagesArray.reverse();
        const oldMessages = Store.getState().messages as Message[] || [];

        Store.setState("isLoaderActive", false);

        //Найти причину - там начинает вызываться 2 раза
        if(oldMessages.length > 0 && oldMessages[0].id === messagesArrayReversed[0].id){
            Store.setState("messages", [...messagesArrayReversed]);
        }
        else{
            Store.setState("messages", [...messagesArrayReversed, ...oldMessages]);
        }
    }

    private onSendMessageCallback = (rawMessage: SocketResponse)=>{
        Store.setState("isLoaderActive", false);
        const oldMessages = Store.getState().messages as Message[];
        const newMessage = new MessageModel(rawMessage);
        Store.setState("messages", [...oldMessages, newMessage] )
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

export default new MessagesController();
