import HTTPTransport from "../framework/Http/HTTPTransport";
import { BaseAPI } from "../framework/Http/BaseApi";

export default class ChatsApi extends BaseAPI {
    private transport = new HTTPTransport('api/v2');


    create() {
        return this.transport.post("/chats", {data: {title: "Тестовый чат"}});
    }

    request() {
        return this.transport.get('/chats');
    }
}
