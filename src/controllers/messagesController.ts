import MessagesApi, { type socketRequest } from "../api/messagesApi";
import Store from "../framework/store/Store";
import { MessageModel, type Message } from "../types/message";
import BaseFormController from "./baseFormController";

export default class MessagesController extends BaseFormController<socketRequest>{

    private messagesApi = new MessagesApi();

    async startConnecton(chatId: number){
        const currentUser = Store.getState().currentUser as number;
        if(!currentUser) return;

        this.messagesApi.start(chatId, currentUser);
        this.messagesApi.setOnMessagesReceived((response) => {
            if(Array.isArray(response)){
                const messagesArray = response.map(mess => new MessageModel(mess))

                const messagesArrayReversed = messagesArray.reverse();

                Store.setState("messages", messagesArrayReversed);
            }
            else if(response.type == "message"){
                const oldMessages = Store.getState().messages as Message[];
                const newMessage = new MessageModel(response);
                Store.setState("messages", [...oldMessages, newMessage] )
            }
        });
    }

    async closeConnection(){
        this.messagesApi.closeConnection();
    }

    protected formSend = (data: socketRequest | null)=>{
        return this.messagesApi.send(data);
    };
}
