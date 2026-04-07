import ChatsApi from "../api/chatsApi";
import Store from "../framework/store/Store";
import { errorHandler } from "../services/errorHandler";
import type { AddChat } from "../types/addChat";
import BaseFormController from "./baseFormController";

export default class ChatsController extends BaseFormController<AddChat>  {
    private chatsApi: ChatsApi = new ChatsApi();

    public async getChats(){
        try{
            const chatsList = await this.chatsApi.request();
            Store.setState("chats", chatsList);
        }
        catch(e){
            console.log("Не получилось доставить чаты");
        }
    }

    private async createChat(chat: AddChat | null){
        try{
            const newChat = await this.chatsApi.create(chat);
            if(newChat){
                await this.getChats();
            }
        }
        catch(error: unknown){
            const parsedError = errorHandler(error);
            Store.setState("addChatError", parsedError);
        }
    }

    public formSend=(data: AddChat | null) =>{
        return this.createChat(data)
    };
}
