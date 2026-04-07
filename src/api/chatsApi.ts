import HTTPTransport from "../framework/Http/HTTPTransport";
import { BaseAPI } from "../framework/Http/BaseApi";

export default class ChatsApi extends BaseAPI {
    private transport = new HTTPTransport('api/v2');

    create(newChat) {
        return this.transport.post("/chats", {data: newChat});
    }

    request() {
        return this.transport.get('/chats');
    }
}
