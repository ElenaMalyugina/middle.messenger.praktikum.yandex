import RegistrationController from "../../../controllers/registrationController";
import Store from "../../../framework/store/Store";
import type { Registration } from "../../../types/registration";
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
    private registrationController = new RegistrationController();

    constructor(props: RegistrationFormProps){
        super(props);

        Store.subscribe(()=>{
           this.errorFormHandler();
        })

        this.setProps({
            data: {...initialUser}
        })
    }

    submitForm = (form: Form)=>{
        this.registrationController.submitFormHandler(form);
    }
}
