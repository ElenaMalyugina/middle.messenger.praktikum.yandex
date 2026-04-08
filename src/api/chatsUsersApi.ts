import HTTPTransport from "../framework/Http/HTTPTransport";

export interface ChatUsersData{
    users: number[];
    chatId: number;
}

export default class ChatsUsersApi {
    private transport = new HTTPTransport('api/v2');

    getUsers(chatId:number, params: Record<string, unknown>){
        return this.transport.get(`/chats/${chatId}/users`, params);
    }

    searchUsers(data: string){
        return this.transport.post("/user/search", {data: {login:data}})
    }

    addUsers(data: ChatUsersData): Promise<unknown> {
        return this.transport.put("/chats/users", { data: data })
    }

    deleteUsers(data: ChatUsersData): Promise<unknown> {
        return this.transport.delete("/chats/users", { data: data });
    }
}
