import MessagesApi from "../api/messagesApi";
import Store from "../framework/store/Store";
import type { Message } from "../types/message";
import BaseFormController from "./baseFormController";

export default class MessagesController extends BaseFormController<Message>{

    private messagesApi = new MessagesApi();

    async startConnecton(chatId: number){
        const currentUser = Store.getState().currentUser as number;
        if(!currentUser) return;

        return this.messagesApi.start(chatId, currentUser);
    }

    async closeConnection(){
        this.messagesApi.closeConnection();
    }

    protected formSend = (data: Message | null)=>{
        return this.messagesApi.send(data);
    };
}
