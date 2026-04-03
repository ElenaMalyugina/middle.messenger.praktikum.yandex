import LoginController from "../../../controllers/loginFormController";
import Store from "../../../framework/store/Store";
import ErrorMessage from "../../../ui-units/error-message/error-message";
import Form, { type FormProps } from "../../../ui-units/form/form";
import loginFormTemplate from "./login-form.hbs?raw";

const initialData:Login = {
    login: "",
    password: ""
}

interface Login{
    login:string;
    password: string;
}

interface LoginFormProps extends FormProps{
    data: Login;
}

export default class LoginForm extends Form<LoginFormProps>{
    static componentName = 'LoginForm';
    protected template = loginFormTemplate;
    private loginController = new LoginController();

    protected componentDidMount(): void {
        this.setProps({
            data: {...initialData}
        })

        Store.subscribe(()=>{
            /*если ошибка*/
            const errorMessageBlock= this.children.find(el=> el instanceof ErrorMessage);
            if(!errorMessageBlock) return;
            const loginError = Store.getState();

            errorMessageBlock.setProps({message: loginError.loginError as string })

        })
    }

    submitForm = (form: Form)=>{
        this.loginController.submitFormHandler(form);
    }
}
