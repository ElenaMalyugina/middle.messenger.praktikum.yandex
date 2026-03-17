import "./chat-item.css";
import Block, { type BlockOwnProps } from "../../../framework/Block";
import ChatItemTemplate from "./chat-item.hbs?raw";

export interface ChatItemProps extends BlockOwnProps{
    id: number;
    title: string;
    avatarUrl: string;
    unreadСount:number;
    isActive: boolean;
    lastMessage:{
        time:string;
        text: string;
    };
    selectChatEmit?: (id:number)=>void
}



export default class ChatItem extends Block<Partial<ChatItemProps>>{
    static componentName = 'ChatItem';
    protected template = ChatItemTemplate;

    public getId():number{
        return this.props.id || -1;
    }

    protected events = {
        click: () => {
            if(this.props.selectChatEmit && this.props.id){
                this.props.selectChatEmit(this.props.id);
            }
        }
    }
}
