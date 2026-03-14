import "/src/layouts/form-page/form-page-layout.css";
import Handlebars from "handlebars";
import Block from "./../../framework/Block";
import formPageLayout from "/src/layouts/form-page/form-page-layout.hbs?raw";
import loginTemplate from "./login.hbs?raw";
import { registerComponent } from "../../framework/RegisterComponent";
import LoginForm from "./partials/login-form";

Handlebars.registerPartial("form-page-layout", formPageLayout);
registerComponent(LoginForm);

export default class Login extends Block {
    static componentName = 'Login';
    protected template = loginTemplate;

}
