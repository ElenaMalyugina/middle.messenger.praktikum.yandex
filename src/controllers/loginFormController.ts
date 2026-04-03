import LoginApi from "../api/loginApi";
import Store from "../framework/store/Store";
import { errorHandler } from "../services/errorHandler";
import type { Login } from "../types/login";
import BaseFormController from "./baseFormController";

export default class LoginController extends BaseFormController<Login> {
    private loginApi: LoginApi = new LoginApi();

    public formSend = (data: Login | null)=>{
        return this.login(data);
    }

    private async login(data: Login | null) {
        try {
            await this.loginApi.create(data);
        }
        catch (error: unknown) {
            const parsedError = errorHandler(error);
            Store.setState("loginError", parsedError);
        }
    }
}
