import RegistrationApi from "../api/registrationApi";
import Store from "../framework/store/Store";
import type { Registration } from "../types/registration";
import BaseFormController from "./baseFormController";


export default class RegistrationController extends BaseFormController<Registration> {
    private registrationApi: RegistrationApi = new RegistrationApi();

    public formSend = (data: Registration | null)=>{
        return this.registrationUser(data);
    }

    private async registrationUser(data: Registration | null) {
        try {
            await this.registrationApi.create(data);
        }
        catch (error: unknown) {
            if(error && typeof error == 'object' && error.hasOwnProperty("response")){
                const errorJson = JSON.parse(error.response);
                Store.setState("serverError", errorJson.reason);
            }
        }
    }
}
