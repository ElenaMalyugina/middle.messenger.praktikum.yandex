import "./chat-item.css";
import Block, { type BlockOwnProps } from "../../../framework/Block";
import ChatItemTemplate from "./chat-item.hbs?raw";

export interface ChatItemProps extends BlockOwnProps{
    id: number;
    title: string;
    avatarUrl: string;
    unreadСount:number;
    isActiveClass?: string;
    lastMessage:{
        time:string;
        text: string;
    };
    selectChatEmit?: (id:unknown)=>void
}



export default class ChatItem extends Block<Partial<ChatItemProps>>{
    static componentName = 'ChatItem';
    protected template = ChatItemTemplate;

    protected events = {
        click: () => {
            if(this.props.selectChatEmit){
                this.props.selectChatEmit(this.props.id);
            }
        }
    }
}
