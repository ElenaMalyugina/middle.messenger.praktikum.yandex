import HTTPTransport from "../framework/Http/HTTPTransport";
import { BaseAPI } from "../framework/Http/BaseApi";
import type { ChatData } from "../types/chatData";

interface Token{
    token: string;
}

export default class ChatsApi extends BaseAPI {
    private transport = new HTTPTransport('api/v2/chats');

    create<T = ChatData>(newChat: T) {
        return this.transport.post("/", {data: newChat});
    }

    request(params: Record<string, unknown>) {
        return this.transport.get('/', params);
    }

    updateAvatar<T = FormData>(avatar: T){
        return this.transport.put("/avatar",
            { data: avatar }
        )
    }

    delete<T = number>(chatId: T) {
        return this.transport.delete("/", {
            data: { chatId: chatId }
        })
    }

    getUnreadCount(chatId: number): Promise<number>{
        return this.transport.get(`/new/${chatId}`);
    }

    getToken(chatId: number): Promise<Token>{
        return this.transport.post(`/token/${chatId}`);
    }
}
