import RegistrationController from "../../../controllers/registrationController";
import connect from "../../../framework/connect";
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

class RegistrationForm extends Form<RegistrationFormProps> {
    static componentName = 'RegistrationForm';
    protected template = registrationFormTemplate;
    private registrationController = new RegistrationController()

    protected componentDidMount(): void {
        this.setProps({
            data: {...initialUser}
        })

        Store.subscribe(()=>{
            /*если ошибка*/
            const errorMessageBlock= this.children.find(el=> el instanceof ErrorMessage);
            if(!errorMessageBlock) return;
            const regError = Store.getState();

            errorMessageBlock.setProps({message: regError.registrationError as string })
        })
    }

    submitForm = (form: Form)=>{
        this.registrationController.submitFormHandler(form);
    }
}

const withRegistration = connect(state=>({regServerError: state.regServerError}));

export default withRegistration(RegistrationForm);
