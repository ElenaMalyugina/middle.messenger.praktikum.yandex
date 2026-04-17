import "./message-item.css";
import Block, { type BlockOwnProps } from "../../../framework/Block";
import MessageItemTemplate from "./message-item.hbs?raw";
import type { Message } from "../../../types/message";

export interface MessageItemProps extends BlockOwnProps{
    message: Message;
    resourcePath: string;
}

export default class MessageItem extends Block<MessageItemProps>{
    static componentName = 'MessageItem';
    protected template = MessageItemTemplate;

    constructor(props: MessageItemProps){
        super(props)
        this.props.resourcePath = "https://ya-praktikum.tech/api/v2/resources/";
    }
}
