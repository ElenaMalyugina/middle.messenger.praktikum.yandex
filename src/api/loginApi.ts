import HTTPTransport from "../framework/Http/HTTPTransport";
import { BaseAPI } from "../framework/Http/BaseApi";
import type { Login } from "../types/login";

export default class LoginApi extends BaseAPI {
    private transport: HTTPTransport;

    constructor() {
        super();
        this.transport = new HTTPTransport('api/v2/auth');
    }

    create<T = Login>(loginData: T): Promise<unknown> {
        return this.transport.post('/signin', {data: loginData} );
    }

    request(): Promise<unknown> {
        return this.transport.get("/user")
    }

    delete(): Promise<unknown> {
        return this.transport.post("/logout")
    }
}
