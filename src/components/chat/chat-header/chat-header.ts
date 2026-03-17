import "./chat-header.css";
import Block from "../../../framework/Block";
import ChatHeaderTemplate from "./chat-header.hbs?raw";

export default class ChatHeader extends Block{
    static componentName = 'ChatHeader';
    protected template = ChatHeaderTemplate;
}
