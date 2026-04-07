import { BaseAPI } from "../framework/Http/BaseApi";
import HTTPTransport from "../framework/Http/HTTPTransport";
import type { UserInfo } from "../types/userInfo";

export default class ProfileApi extends BaseAPI {
    private transport: HTTPTransport;

    constructor() {
        super();
        this.transport = new HTTPTransport('api/v2/user');
    }

    update<T = UserInfo>(userData: T){
        return this.transport.put("/profile", {data: userData})
    }

    updateAvatar<T = FormData>(avatar: T){
        return this.transport.put("/profile/avatar", {data: avatar}
        )
    }
}
