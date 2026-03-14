import "/src/layouts/form-page/form-page-layout.css";
import Handlebars from "handlebars";
import Block from "../../framework/Block";
import formPageLayout from "/src/layouts/form-page/form-page-layout.hbs?raw";
import registrationTemplate from "./registration.hbs?raw";
import RegistrationForm from "./partials/registration-form";
import { registerComponent } from "../../framework/RegisterComponent";

Handlebars.registerPartial("form-page-layout", formPageLayout);
registerComponent(RegistrationForm);

export default class Registration extends Block{
    static componentName = 'Registration';
    protected template = registrationTemplate;



}

