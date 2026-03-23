import "./messages-box.css";
import MessagesBoxTemplate from "./messages-box.hbs?raw";
import Block from "../../../framework/Block";

export default class MessagesBox extends Block {
    static componentName = 'MessagesBox';
    protected template = MessagesBoxTemplate;

}

