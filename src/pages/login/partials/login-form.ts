import Form from "../../../ui-units/form/form";
import loginFormTemplate from "./login-form.hbs?raw";

export default class LoginForm extends Form {
    static componentName = 'LoginForm';
    protected template = loginFormTemplate;
}
