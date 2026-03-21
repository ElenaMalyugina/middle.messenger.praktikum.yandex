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

    protected componentDidMount(): void {
        this.setProps({
            data: {...initialData}
        })
    }
}
