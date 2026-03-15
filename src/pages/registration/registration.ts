import Block from "../../framework/Block";
import { registerComponent } from "../../framework/RegisterComponent";
import FormPageLayout from "../../layouts/form-page/form-page-layout";
import registrationTemplate from "./registration.hbs?raw";
import RegistrationForm from "./partials/registration-form";

FormPageLayout.register();
registerComponent(RegistrationForm);

export default class Registration extends Block{
    static componentName = 'Registration';
    protected template = registrationTemplate;
}

