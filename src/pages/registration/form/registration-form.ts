import RegistrationController from "../../../controllers/registrationController";
import Store from "../../../framework/store/Store";
import type { Registration } from "../../../types/registration";
import ErrorMessage from "../../../ui-units/error-message/error-message";
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

        Store.subscribe(()=>{
            //если ошибка регистрации на бэке
            const regError = Store.getState();
            const errorMessageBlock= this.children.find(el=> el instanceof ErrorMessage);
            if(!errorMessageBlock) return;
            errorMessageBlock.setProps({message: regError.regServerError as string })
        })
    }

    submitForm = (form: Form)=>{
        this.registrationController.submitFormHandler(form);
    }
}
