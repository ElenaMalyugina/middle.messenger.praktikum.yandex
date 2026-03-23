import "./message-send.css";
import Block from "../../../framework/Block";
import MessageSendTemplate from "./message-send.hbs?raw";

export default class MessageSend extends Block{
    static componentName = 'MessageSend';
    protected template = MessageSendTemplate;
}
