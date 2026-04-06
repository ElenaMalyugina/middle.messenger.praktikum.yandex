import "./chat-item.css";
import Block, { type BlockOwnProps } from "../../../framework/Block";
import ChatItemTemplate from "./chat-item.hbs?raw";
import Store from "../../../framework/store/Store";

export interface ChatData{
    id: number;
    title: string;
    avatar: string;
    unreadСount:number;
    lastMessage:{
        time:string;
        text: string;
    };
}

export interface ChatItemProps extends BlockOwnProps{
    chatData: ChatData;
    isActive: boolean;
    selectChatEmit: (id:number)=>void
}

export default class ChatItem extends Block<ChatItemProps>{
    static componentName = 'ChatItem';
    protected template = ChatItemTemplate;

    constructor(props:ChatItemProps){
        super(props)
    }

    public getId():number{
        return this.props.chatData.id || -1;
    }

    protected events = {
        click: () => {
            Store.setState("activeChat", this.props.chatData.id);
        }
    }
}
