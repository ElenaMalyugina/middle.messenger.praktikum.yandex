import Form, { type FormProps } from "../../../ui-units/form/form";
import registrationFormTemplate from "./registration-form.hbs?raw";

const initialUser:Registration = {
    email: "",
    login: "",
    first_name: "",
    second_name: "",
    phone: "",
    new_password: "",
    repeat_password: ""
}

interface Registration{
    email: string;
    login: string;
    first_name: string;
    second_name: string;
    phone: string;
    new_password: string;
    repeat_password: string;
}

interface RegistrationFormProps extends FormProps{
    data: Registration;
}

export default class RegistrationForm extends Form<RegistrationFormProps> {
    static componentName = 'RegistrationForm';
    protected template = registrationFormTemplate;

    protected componentDidMount(): void {
        this.setProps({
            data: {...initialUser}
        })
    }
}
