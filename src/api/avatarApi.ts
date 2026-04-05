import { BaseAPI } from "../framework/Http/BaseApi";
import HTTPTransport from "../framework/Http/HTTPTransport";

export default class AvatarApi extends BaseAPI {
    private transport: HTTPTransport;

    constructor() {
        super();
        this.transport = new HTTPTransport('api/v2/user');
    }

    update<T = FormData>(avatar: T){
        return this.transport.put("/profile/avatar",
            {
                data: avatar
            }
        )
    }

}
