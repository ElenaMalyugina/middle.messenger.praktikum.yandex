import "./chat-body.css";
import Handlebars from "handlebars";
import ChatBodyTemplate from "./chat-body.hbs?raw";

export default class ChatBody {
    public static register=()=>(
        Handlebars.registerPartial("ChatBody", ChatBodyTemplate)
    )

}

