import LoginApi from "../api/loginApi";
import RegistrationApi from "../api/registrationApi";
import Router from "../framework/router/Router";
import Store from "../framework/store/Store";
import { errorHandler } from "../services/errorHandler";
import type { Registration } from "../types/registration";
import BaseFormController from "./baseFormController";


export default class RegistrationController extends BaseFormController<Registration> {
    private registrationApi: RegistrationApi = new RegistrationApi();
    private loginApi = new LoginApi();
    private routing = Router.getInstance("#app");

    public formSend = (data: Registration | null)=>{
        return this.registrationUser(data);
    }

    private async registrationUser(data: Registration | null) {
        try {
            const result = await this.registrationApi.create(data);
            if (result && typeof result === 'object' && 'id' in result) {
                this.routing.go('/messenger');
            }
        }
        catch (error: unknown) {
            this.loginApi.delete();
            const parsedError = errorHandler(error);
            Store.setState("regServerError", parsedError);
        }
    }
}
