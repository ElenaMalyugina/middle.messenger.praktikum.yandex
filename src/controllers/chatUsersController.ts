import ChatsUsersApi from "../api/chatsUsersApi";
import Store from "../framework/store/Store";
import BaseFormController from "./baseFormController";

export default class ChatUsersController extends BaseFormController<unknown>{
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

    public async addUser(){

    }

    public async deleteUser(){

    }

    public formSend=(data: unknown | null) =>{
        return this.addUser();
    };
}
