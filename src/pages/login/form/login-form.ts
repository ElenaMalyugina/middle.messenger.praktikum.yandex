import LoginController from "../../../controllers/loginFormController";
import Store from "../../../framework/store/Store";
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

    constructor(props: LoginFormProps){
        super(props);

        Store.subscribe(()=>{
            this.errorFormHandler();
        })
    }

    protected componentDidMount(): void {
         this.setProps({
            data: {...initialData}
        })
    }

    submitForm = (form: Form)=>{
        this.loginController.submitFormHandler(form);
    }
}
