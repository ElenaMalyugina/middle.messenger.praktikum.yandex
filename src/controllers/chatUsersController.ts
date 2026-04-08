import ChatsUsersApi from "../api/chatsUsersApi";
import Store from "../framework/store/Store";
import BaseFormController from "./baseFormController";

interface ChatUsers{
    users: number[];
    chatId: number;
}

interface RawChatUsers{
    id: number;
    chatId: number;
}

export default class ChatUsersController extends BaseFormController<RawChatUsers>{
    private chatsUsersApi: ChatsUsersApi = new ChatsUsersApi();

    public async getChatUsers(chatId: number){
        try{
            const users = await this.chatsUsersApi.getUsers(chatId, {});
            Store.setState("ActiveChatsUsers", users);
        }
        catch(e){
            console.log("Не удалось загрузить списки пользователей");
        }
    }

    public async searchUsers(searchString: string ){
        try{
            const users = await this.chatsUsersApi.searchUsers(searchString);
            Store.setState("searchedUser", users);
        }
        catch(e){
            console.log("Не удалось загрузить");
        }
    }

    public async addUser(data: ChatUsers){
        try{
            const users = await this.chatsUsersApi.addUsers(data);
            Store.setState("searchedUser", users);
        }
        catch(e){
            console.log("Не удалось загрузить");
        }
    }

    public async deleteUser(){

    }

    public formSend = (data: RawChatUsers | null) =>{
        let adaptedData: ChatUsers = {
            users: [],
            chatId: -1
        }

        if(data){
            adaptedData = {
                users: [data.id],
                chatId: data.chatId
            }
        }
        return this.addUser(adaptedData);
    };
}
