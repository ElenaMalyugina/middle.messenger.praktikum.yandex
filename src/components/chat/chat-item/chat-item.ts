import "./chat-item.css";
import Block, { type BlockOwnProps } from "../../../framework/Block";
import ChatItemTemplate from "./chat-item.hbs?raw";
import type { ChatData } from "../../../types/chatData";
import ChatsController from "../../../controllers/chatsController";
import { AppRouter } from "../../..";

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
        click: (e: Event) => {
            e.preventDefault();

            if(!this.props.isActive){
                AppRouter.go(`/messenger/${this.props.chatData.id}`);
            }
        }
    }

    protected deleteChat = (e: Event)=>{
        e.preventDefault();
        e.stopPropagation();

        this.chatsController.deleteChat(this.props.chatData.id);
    }
}
