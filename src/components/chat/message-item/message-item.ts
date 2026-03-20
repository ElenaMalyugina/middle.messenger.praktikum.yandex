import "./message-item.css";
import Block, { type BlockOwnProps } from "../../../framework/Block";
import MessageItemTemplate from "./message-item.hbs?raw";

export interface MessageItemProps extends BlockOwnProps{
    block: string;
    message: Message
}

export interface Message{
    id: number;
    chat_id: number;
    user_id: number;
    time: string;
    content: string;
    file?:{
        path: string;
    }
    type: string;
    isAuthor: boolean;
}

export default class MessageItem extends Block<MessageItemProps>{
    static componentName = 'MessageItem';
    protected template = MessageItemTemplate;

}
