import "./message-item.css";
import Block, { type BlockOwnProps } from "../../../framework/Block";
import MessageItemTemplate from "./message-item.hbs?raw";

interface MessageItemSettingsProps extends BlockOwnProps{
    block: string;
}

export interface MessageItemProps{
    id: number;
    chat_id: number;
    user_id: number;
    time: string;
    content: string;
    file?:{
        path: string;
    }
    type: string;
}

export default class MessageItem extends Block<Partial<MessageItemSettingsProps&MessageItemProps>>{
    static componentName = 'MessageItem';
    protected template = MessageItemTemplate;


}
