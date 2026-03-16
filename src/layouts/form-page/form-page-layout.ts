import "./form-page-layout.css";
import Handlebars from "handlebars";
import FormPageLayoutTemplate from "./form-page-layout.hbs?raw";

export default class FormPageLayout{
    public static register=()=>(
        Handlebars.registerPartial("form-page-layout", FormPageLayoutTemplate)
    )
}
