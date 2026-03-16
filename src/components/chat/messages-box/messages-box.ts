import "./messages-box.css";
import Handlebars from "handlebars";
import MessagesBoxTemplate from "./messages-box.hbs?raw";

export default class MessagesBox {
    public static register=()=>(
        Handlebars.registerPartial("MessagesBox", MessagesBoxTemplate)
    )

}

