import ChatsApi from "../api/chatsApi";
import Store from "../framework/store/Store";

export default class ChatsController  {
    private chatsApi: ChatsApi = new ChatsApi();

    public async getChats(){
        try{
            const chatsList = await this.chatsApi.request();
            Store.setState("chats", chatsList);
        }
        catch(e){

        }
    }

    public async getChat(){
        try{
            await this.chatsApi.create();
        }
        catch(e){

        }
    }
}
