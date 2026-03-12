import "/src/layouts/form-page/form-page-layout.css";
import "/src/components/row-blocks/input-block/input-block.css";
import Block from "./../../framework/Block";
import { floatLabels } from "../../utils/input-utils";
import Handlebars from "handlebars";
import formPageLayout from "/src/layouts/form-page/form-page-layout.hbs?raw";
import inputBlock from "/src/components/row-blocks/input-block/input-block.hbs?raw";
import LoginTemplate from "./login.hbs?raw";

Handlebars.registerPartial("form-page-layout", formPageLayout);
Handlebars.registerPartial("input-block", inputBlock);

const block = "login";

document.addEventListener("DOMContentLoaded", ()=>{
    floatLabels(".js-float-block", "input-block--input-not-empty");
})



class Login extends Block{
    static componentName = 'Login';

    protected template = LoginTemplate;
}

export default new Login({}).element();



