import "/src/layouts/form-page/form-page-layout.css";
import Handlebars from "handlebars";
import Block from "../../framework/Block";
import formPageLayout from "/src/layouts/form-page/form-page-layout.hbs?raw";
import registrationTemplate from "./registration.hbs?raw";
import { tempSubmitHandler } from "../../framework/FormHandler";

Handlebars.registerPartial("form-page-layout", formPageLayout);

export default class Registration extends Block{
    static componentName = 'Registration';
    protected template = registrationTemplate;

    protected events = {
        submit: (event: Event) => {
            event.preventDefault();
            tempSubmitHandler(this.refs);
        },
    };

}

