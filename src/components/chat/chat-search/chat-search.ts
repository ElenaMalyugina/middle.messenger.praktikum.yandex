import "./chat-search.css";
import Block from "../../../framework/Block";
import ChatSearchTemplate from "./chat-search.hbs?raw";

export default class ChatSearch extends Block{
    static componentName = 'ChatSearch';
    protected template = ChatSearchTemplate;
}
