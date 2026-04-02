import RegistrationApi from "../api/registrationApi";
import BaseFormController from "./baseFormController";

export interface Registration{
    email: string;
    login: string;
    first_name: string;
    second_name: string;
    phone: string;
    new_password: string;
    repeat_password: string;
}

export default class RegistrationController extends BaseFormController<Registration> {
    private registrationApi: RegistrationApi = new RegistrationApi();

    public formSend = (data: Registration | null)=>{
        return this.registrationUser(data);
    }

    private async registrationUser(data: Registration | null) {
        try {
            return await this.registrationApi.create(data);
        }
        catch (error) {
            return error;
        }
    }
}
