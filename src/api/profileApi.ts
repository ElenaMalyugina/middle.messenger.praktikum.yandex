import { BaseAPI } from "../framework/Http/BaseApi";
import HTTPTransport from "../framework/Http/HTTPTransport";

export default class ProfileApi extends BaseAPI {
    private transport: HTTPTransport;

    constructor() {
        super();
        this.transport = new HTTPTransport('api/v2/user');
    }


}
