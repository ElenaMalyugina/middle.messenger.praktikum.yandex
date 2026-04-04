import HTTPTransport from "../framework/Http/HTTPTransport";
import { BaseAPI } from "../framework/Http/BaseApi";

const chatAPIInstance = new HTTPTransport('api/v2/chats');

export default class ChatApi extends BaseAPI {
    /*create() {
        // Здесь уже не нужно писать полный путь /api/v1/chats/
        return chatAPIInstance.post('/', { title: 'string' });
    }*/

    request() {
        // Здесь уже не нужно писать полный путь /api/v1/chats/
        return chatAPIInstance.get('').then(x=> console.log(x));
    }
}
