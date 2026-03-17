import "./messages-box-header.css";
import Block from "../../../framework/Block";
import MessagesBoxHeaderTemplate from "./messages-box-header.hbs?raw";

export default class MessagesBoxHeader extends Block{
    static componentName = 'MessagesBoxHeader';
    protected template = MessagesBoxHeaderTemplate;
}
