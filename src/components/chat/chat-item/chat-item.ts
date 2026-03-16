import "./chat-item.css";
import Block, { type BlockOwnProps } from "../../../framework/Block";
import ChatItemTemplate from "./chat-item.hbs?raw";

export interface ChatItemProps extends BlockOwnProps{
    title: string;
    avatarUrl: string;
    unreadСount:number;
    lastMessage:{
        time:string;
        text: string;
    }
}

export default class ChatItem extends Block<Partial<ChatItemProps>>{
    static componentName = 'ChatItem';
    protected template = ChatItemTemplate;
}
