import Block from "../../../../framework/Block";
import AddChatTemplate from "./add-chat.hbs?raw";

export default class AddChat extends Block{
    static componentName = 'AddChat';
    protected template = AddChatTemplate;
}
