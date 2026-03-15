import "/src/layouts/form-page/form-page-layout.css";
import Handlebars from "handlebars";
import ProfilePageLayoutTemplate from "./form-page-layout.hbs?raw";

export default class FormPageLayout{
    public static register=()=>(
        Handlebars.registerPartial("form-page-layout", ProfilePageLayoutTemplate)
    )

}
