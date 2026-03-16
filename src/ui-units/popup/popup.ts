import "./popup.css";
import Handlebars from "handlebars";
import popupTemplate from "./popup.hbs?raw";

export default class Popup{
    public static register=()=>(
        Handlebars.registerPartial("custom-popup", popupTemplate)
    )
}
