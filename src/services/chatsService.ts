import Store from "../framework/store/Store";
import { ChatDataModel, type ChatData } from "../types/chatData";
import type { RouteState } from "../types/RouteState";

export class ChatsService{
    static getActiveChat: ()=> ChatData | null = ()=>{
        const routeState = Store.getState().route as RouteState | null;
        if(!routeState) return null;
        const currentChatId = Number(routeState.params.id);

        if(!currentChatId) return null;

        const chatsList = Store.getState().chats as ChatData[];
        if(!chatsList ||! Array.isArray(chatsList)) return null;
        const activeChat = chatsList.find(el=>el.id === currentChatId);

        if(activeChat){
            return new ChatDataModel(activeChat);
        }

        return null;
    }
}
