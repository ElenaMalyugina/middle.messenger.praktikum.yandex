import ChatsUsersApi from "../api/chatsUsersApi";
import Store from "../framework/store/Store";
import { errorHandler } from "../services/errorHandler";
import { validatorUserExists } from "../services/validationService";
import { modalHide } from "../utils/hideModal";
import BaseFormController from "./baseFormController";

interface ChatUsers{
    users: number[];
    chatId: number;
}

interface RawChatUsers{
    type: string;
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
        catch(_e){
            console.log("Не удалось загрузить списки пользователей");
        }
    }

    public async searchUsers(searchString: string ){
        try{
            const users = await this.chatsUsersApi.searchUsers(searchString);
            Store.setState("searchedUser", users);
        }
        catch(_e){
            console.log("Не удалось загрузить");
        }
    }

    public async addUser(data: ChatUsers){
        try{
            await this.chatsUsersApi.addUsers(data);
            await this.getChatUsers(data.chatId);
            modalHide();
        }
        catch(error:unknown){
            const parsedError = errorHandler(error);
            Store.setState("addUserError", parsedError);
        }
        finally{
            Store.setState("isLoaderActive", false);
        }
    }

    public async deleteUser(data: ChatUsers){
        try{
            await this.chatsUsersApi.deleteUsers(data);
            await this.getChatUsers(data.chatId);
            modalHide();
        }
        catch(error:unknown){
            const parsedError = errorHandler(error);
            Store.setState("deleteUserError", parsedError);
        }
        finally{
            Store.setState("isLoaderActive", false);
        }
    }

    public formSend = (data: RawChatUsers | null) =>{
        if(!data) return null;

        const adaptedData: ChatUsers = {
            users: [],
            chatId: -1
        }

        const isUserExsists = validatorUserExists(data);

        if(!isUserExsists.isValid){
            Store.setState(`${data.type}UserError`, isUserExsists.text);
            return null;
        }

        adaptedData.users = [data.id];
        adaptedData.chatId = data.chatId || - 1;

        Store.setState("isLoaderActive", true);
        if(data.type == "add"){
            return this.addUser(adaptedData);
        }

        if(data.type == "delete"){
            return this.deleteUser(adaptedData);
        }

        return null
    };


}
