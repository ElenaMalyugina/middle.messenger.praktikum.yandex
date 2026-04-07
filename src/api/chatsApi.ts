import HTTPTransport from "../framework/Http/HTTPTransport";
import { BaseAPI } from "../framework/Http/BaseApi";
import type { ChatData } from "../types/chatData";

export default class ChatsApi extends BaseAPI {
    private transport = new HTTPTransport('api/v2');

    create<T = ChatData>(newChat: T) {
        return this.transport.post("/chats", {data: newChat});
    }

    request(params: Record<string, unknown>) {
        return this.transport.get('/chats', params);
    }

    updateAvatar<T = FormData>(avatar: T){
        return this.transport.put("/chats/avatar",
            {
                data: avatar
            }
        )
    }

    getChatUsers(chatId:number ,params: Record<string, unknown>){
        return this.transport.get(`/chats/${chatId}/users`, params);
    }
}
