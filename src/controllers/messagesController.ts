import MessagesApi from "../api/messagesApi";
import Store from "../framework/store/Store";

export default class MessagesController{
    private messagesApi = new MessagesApi();

    async startConnecton(chatId: number){
        const currentUser = Store.getState().currentUser as number;
        if(!currentUser) return;

        return this.messagesApi.start(chatId, currentUser);
    }

    async closeConnection(){
        this.messagesApi.closeConnection();
    }

}
