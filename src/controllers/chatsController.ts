import ChatsApi from "../api/chatsApi";
import Store from "../framework/store/Store";
import { errorHandler } from "../services/errorHandler";
import type { AddChat } from "../types/addChat";
import { ChatDataModel, type ChatData } from "../types/chatData";
import { modalHide } from "../utils/hideModal";
import BaseFormController from "./baseFormController";

export default class ChatsController extends BaseFormController<AddChat>  {
    private chatsApi: ChatsApi = new ChatsApi();

     public formSend=(data: AddChat | null) =>{
        Store.setState("isLoaderActive", true);
        return this.createChat(data)
    };

    public async getChats(){
        try{
            const chatsList = await this.chatsApi.request({});
            Store.setState("chats", chatsList);
        }
        catch(_e){
            console.log("Не получилось доставить чаты");
        }
    }

    public async searchChats(queryString: string){
        try{
            const chatsList = await this.chatsApi.request({data:{title: queryString}});
            Store.setState("chats", chatsList);
        }
        catch(_e){
            console.log("Чаты не найдены");
        }
    }


    private async createChat(chat: AddChat | null){
        try{
            const newChat = await this.chatsApi.create(chat);
            modalHide();

            if(newChat){
                await this.getChats();
            }
        }
        catch(error: unknown){
            const parsedError = errorHandler(error);
            Store.setState("addChatError", parsedError);
        }
        finally{
            Store.setState("isLoaderActive", false);
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


}
