import "/src/layouts/form-page/form-page-layout.css";
import "/src/components/row-blocks/input-block/input-block.css";
import { floatLabels } from "../../utils/input-utils";
import Handlebars from "handlebars";
import formPageLayout from "/src/layouts/form-page/form-page-layout.hbs?raw";
import inputBlock from "/src/components/row-blocks/input-block/input-block.hbs?raw";
import registrationTemplate from "./registration.hbs?raw";
import Block from "../../framework/Block";

Handlebars.registerPartial("form-page-layout", formPageLayout);
Handlebars.registerPartial("input-block", inputBlock);

const block = "registration";

document.addEventListener("DOMContentLoaded", ()=>{
    floatLabels(".js-float-block", "input-block--input-not-empty");
})

//export default Handlebars.compile(registrationTemplate)({block});

class Registration extends Block{
    static componentName = 'Registration';
    protected template = registrationTemplate;
}

export default Registration;
