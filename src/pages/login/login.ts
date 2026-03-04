import "/src/layouts/form-page/form-page-layout.css";
import "/src/components/row-blocks/input-block/input-block.css";
import Handlebars from "handlebars";
import formPageLayout from "/src/layouts/form-page/form-page-layout.hbs?raw";
import inputBlock from "/src/components/row-blocks/input-block/input-block.hbs?raw";
import loginTemplate from "./login.hbs?raw";

Handlebars.registerPartial("form-page-layout", formPageLayout); 
Handlebars.registerPartial("input-block", inputBlock); 

export default Handlebars.compile(loginTemplate)({});
