import { BaseAPI } from "../framework/Http/BaseApi";
import HTTPTransport from "../framework/Http/HTTPTransport";
import type { ChangePassword } from "../types/changePassword";

export default class ChangePasswordApi extends BaseAPI {
    private transport: HTTPTransport;

    constructor() {
        super();
        this.transport = new HTTPTransport('api/v2/user');
    }

    update<T = ChangePassword>(passwordData: T){
        return this.transport.put("/password", {data: passwordData})
    }
}
