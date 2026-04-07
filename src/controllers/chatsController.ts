import ChatsApi from "../api/chatsApi";
import Store from "../framework/store/Store";
import { errorHandler } from "../services/errorHandler";
import type { AddChat } from "../types/addChat";
import { ChatDataModel, type ChatData } from "../types/chatData";
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

    public async updateAvatar(file: File, chatId: number){
        try{
            const formData = new FormData();
            formData.append('avatar', file);
            formData.append("chatId", chatId.toString());

            const newChat = await this.chatsApi.updateAvatar(formData);
            if(newChat){
                await this.getChats();
            }

            if((newChat as ChatData).avatar){
                Store.setState("activeChat",  new ChatDataModel(newChat as ChatData));
            }
        }
        catch(error){
            const parsedError = errorHandler(error);
            Store.setState("chatAvatarError", parsedError);
        }
    }

    public formSend=(data: AddChat | null) =>{
        return this.createChat(data)
    };
}
