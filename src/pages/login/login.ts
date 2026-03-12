import "/src/layouts/form-page/form-page-layout.css";
import "/src/components/row-blocks/input-block/input-block.css";
import Handlebars from "handlebars";
import { registerComponent } from "../../framework/RegisterComponent";
import Block from "./../../framework/Block";
import formPageLayout from "/src/layouts/form-page/form-page-layout.hbs?raw";
import loginTemplate from "./login.hbs?raw";
import { tempSubmitHandler } from "../../framework/FormHandler";
import InputBlock from "../../components/row-blocks/input-block/input-block";

Handlebars.registerPartial("form-page-layout", formPageLayout);
registerComponent(InputBlock); //не сюда

export default class Login extends Block{
    static componentName = 'Login';
    protected template = loginTemplate;

    protected events = {
        submit: (event: Event) => {
            event.preventDefault();
            tempSubmitHandler(this.refs);
        },
    };
}





