import "./chat-item.css";
import Block, { type BlockOwnProps } from "../../../framework/Block";
import ChatItemTemplate from "./chat-item.hbs?raw";
import Store from "../../../framework/store/Store";
import type { ChatData } from "../../../types/chatData";
import ChatsController from "../../../controllers/chatsController";

export interface ChatItemProps extends BlockOwnProps{
    chatData: ChatData;
    isActive: boolean;
    deleteChatHandler?: (e:Event)=>void;
}

export default class ChatItem extends Block<ChatItemProps>{
    static componentName = 'ChatItem';
    protected template = ChatItemTemplate;
    private chatsController = new ChatsController();

    constructor(props:ChatItemProps){
        super(props);
        this.props.deleteChatHandler = this.deleteChat;
    }

    protected events = {
        click: () => {
            Store.setState("activeChat", this.props.chatData);
        }
    }

    protected deleteChat = (e: Event)=>{
        e.preventDefault();
        e.stopPropagation();

        this.chatsController.deleteChat(this.props.chatData.id);
    }
}
