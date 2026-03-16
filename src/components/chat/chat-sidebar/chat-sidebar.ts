import "./chat-sidebar.css";
import Handlebars from "handlebars";
//import Block, { type BlockOwnProps } from "../../../framework/Block";
import ChatSidebarTemplate from "./chat-sidebar.hbs?raw";

export default class ChatSidebar {
    public static register=()=>(
        Handlebars.registerPartial("ChatSidebar", ChatSidebarTemplate)
    )

}

