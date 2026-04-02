import HTTPTransport from "../framework/Http/HTTPTransport";
import { BaseAPI } from "../framework/Http/BaseApi";
import type { Registration } from "../controllers/registrationController";


export default class RegistrationApi extends BaseAPI {
    private transport: HTTPTransport;

    constructor() {
        super();
        this.transport = new HTTPTransport('api/v2/auth');
    }

    create<T = Registration>(userData: T): Promise<unknown> {
        return this.transport.post('/signup', {data: userData} );
    }

}
