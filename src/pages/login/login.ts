import Block from "./../../framework/Block";
import { registerComponent } from "../../framework/RegisterComponent";
import FormPageLayout from "../../layouts/form-page/form-page-layout";
import loginTemplate from "./login.hbs?raw";
import LoginForm from "./partials/login-form";

FormPageLayout.register();
registerComponent(LoginForm);

export default class Login extends Block {
    static componentName = 'Login';
    protected template = loginTemplate;

}
