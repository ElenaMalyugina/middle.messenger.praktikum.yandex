import ChatsApi from "../api/chatsApi";
import Store from "../framework/store/Store";
import BaseFormController from "./baseFormController";

export default class ChatsController extends BaseFormController<unknown>  {
    private chatsApi: ChatsApi = new ChatsApi();

    public async getChats(){
        try{
            const chatsList = await this.chatsApi.request();
            Store.setState("chats", chatsList);
        }
        catch(e){

        }
    }

    private async createChat(chat){
        try{
            const newChat = await this.chatsApi.create(chat);
            if(newChat){
                await this.getChats();
            }
        }
        catch(e){

        }
    }

    protected formSend=(data: unknown) =>{
        this.createChat(data)
    };
}
