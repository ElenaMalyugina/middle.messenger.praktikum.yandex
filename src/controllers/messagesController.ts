import MessagesApi from "../api/messagesApi";
import type { SocketRequest, SocketResponse } from "../framework/Http/webSocketApi.";
import Store from "../framework/store/Store";
import { errorHandler } from "../services/errorHandler";
import { MessageModel, type Message, type MessageForSend } from "../types/message";
import BaseFormController from "./baseFormController";

export default class MessagesController extends BaseFormController<MessageForSend>{
    private messagesApi: MessagesApi;

    constructor(){
        super();
        this.messagesApi = new MessagesApi(this.getMessagesHandler.bind(this));
    }

    startConnection(chatId: number){
        const currentUser = Store.getState().currentUser as number;
        if(!currentUser) return;

        this.messagesApi.start(chatId, currentUser)
            .then(() => {
                console.log('Соединение установлено, запрашиваем историю сообщений');
                this.getMessages();
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
        this.messagesApi.getMessages(count);
    }

    protected getMessagesHandler = (response: SocketResponse)=>{
        console.log('Получено сообщение от сокета:', response);
        if(Array.isArray(response)){
            const messagesArray = response.map(mess => new MessageModel(mess));
            const messagesArrayReversed = messagesArray.reverse();
            Store.setState("messages", messagesArrayReversed);
        }
        else if(response.type == "message"){
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
                message: uploadedFile.id,
                type: "file"
            })
        }
        catch(error){
            const parsedError = errorHandler(error);
            Store.setState("MessageFileError", parsedError);
        }
    }
}
