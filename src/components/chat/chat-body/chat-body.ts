import ChatsUsersApi from "../../../api/chatsUsersApi";
import MessagesController from "../../../controllers/messagesController";
import Block, { type BlockOwnProps } from "../../../framework/Block";
import Store from "../../../framework/store/Store";
import { ChatsService } from "../../../services/chatsService";
import type { ChatData } from "../../../types/chatData";
//import type { ChatData } from "../../../types/chatData";
import ChatBodyTemplate from "./chat-body.hbs?raw";

interface ChatBodyProps extends BlockOwnProps{
    isSelectedChat: boolean;
    currentChatId: number
}

export default class ChatBody extends Block<ChatBodyProps>{
    static componentName = 'ChatBody';
    protected template = ChatBodyTemplate;
    private messagesController = new MessagesController();


    constructor(props: ChatBodyProps){
        super(props);

        Store.subscribe(()=>{
            const activeChat= ChatsService.getActiveChat() as ChatData;
            if(activeChat && (activeChat.id === this.props.currentChatId)) return;

            this.toggleMessageBoxVisual(activeChat);
            this.socketConnect(activeChat);
        })
    }


    socketConnect=(activeChat: ChatData | null)=>{
        if(!activeChat) {
            this.messagesController.closeConnection();
            this.setProps({currentChatId: -1});
        }
        else if(this.props.currentChatId !== activeChat.id){
            this.messagesController.closeConnection();
            this.messagesController.startConnection(activeChat.id);
            this.setProps({currentChatId: activeChat.id});
        }
    }

    toggleMessageBoxVisual = (activeChat: ChatData | null)=>{
        this.setProps({isSelectedChat: !!activeChat});
    }
}
