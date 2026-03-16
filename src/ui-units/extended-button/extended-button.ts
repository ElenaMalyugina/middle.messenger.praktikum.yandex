import "./extended-button.css";
import Handlebars from "handlebars";
import extendedButtonTemplate from "./extended-button.hbs?raw";

export default class ExtendedButton{
    public static register=()=>(
        Handlebars.registerPartial("extended-button", extendedButtonTemplate)
    )
}
