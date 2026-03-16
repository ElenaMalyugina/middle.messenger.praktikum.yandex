import "./messages-list.css";
import Block, { type BlockOwnProps } from "../../../framework/Block";
import MessagesListTemplate from "./messages-list.hbs?raw";
import type { MessageItemProps } from "../message-item/message-item";
import { messages } from "../../../mocks/messages";

interface MessagesListProps extends BlockOwnProps{
    messages: MessageItemProps[];
}

export default class MessagesList extends Block<Partial<MessagesListProps>>{
    static componentName = 'MessagesList';
    protected template = MessagesListTemplate;

    constructor(props: MessagesListProps){
        super(props)
        this.setProps({messages: [...messages]})

    }
}
