import RegistrationApi from "../api/registrationApi";

export interface Registration{
    email: string;
    login: string;
    first_name: string;
    second_name: string;
    phone: string;
    new_password: string;
    repeat_password: string;
}

export default class RegistrationController {
    private registrationApi: RegistrationApi = new RegistrationApi();

    public async registrationUser(data: Registration) {
        try {
            return await this.registrationApi.create(data);
        }
        catch (error) {
            return error;
        }
    }
}
