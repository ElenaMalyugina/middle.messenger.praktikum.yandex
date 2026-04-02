import type { Registration } from "../../../controllers/registrationController";
import RegistrationController from "../../../controllers/registrationController";
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

interface RegistrationFormProps extends FormProps{
    data: Registration;
}

export default class RegistrationForm extends Form<RegistrationFormProps> {
    static componentName = 'RegistrationForm';
    protected template = registrationFormTemplate;
    private registrationController = new RegistrationController()

    protected componentDidMount(): void {
        this.setProps({
            data: {...initialUser}
        })
    }

    submitFormHandler(data: Registration){
        this.registrationController.registrationUser(data)
            .then(res=>{
                console.log(res);
            })
            .catch(err=>{
                console.log(err)
            })
    }
}
