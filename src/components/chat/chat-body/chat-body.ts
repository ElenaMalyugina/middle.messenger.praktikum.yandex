import MessagesController from "../../../controllers/messagesController";
import Block, { type BlockOwnProps } from "../../../framework/Block";
import Store from "../../../framework/store/Store";
import { ChatsService } from "../../../services/chatsService";
import type { ChatData } from "../../../types/chatData";
//import type { ChatData } from "../../../types/chatData";
import ChatBodyTemplate from "./chat-body.hbs?raw";

interface ChatBodyProps extends BlockOwnProps{
    isSelectedChat: boolean;
    currentChatId: number | null;
}

export default class ChatBody extends Block<ChatBodyProps>{
    static componentName = 'ChatBody';
    protected template = ChatBodyTemplate;
    private messagesController = MessagesController;


    constructor(props: ChatBodyProps){
        super(props);
        this.props.currentChatId = null;
        this.props.isSelectedChat = false;

        Store.subscribe(()=>{
            this.socketConnect();
        })
    }

    socketConnect=()=>{
        const activeChat = ChatsService.getActiveChat() as ChatData;

        if(activeChat && (activeChat.id === this.props.currentChatId)) return;

        if(!activeChat) {
            this.setProps({
                currentChatId: null,
                isSelectedChat: false
            });
            this.messagesController.closeConnection();

        }
        else if(this.props.currentChatId !== activeChat.id){
            this.messagesController.startConnection(activeChat.id);

            this.setProps({
                currentChatId: activeChat.id,
                isSelectedChat: true
            });
        }
    }

    protected componentWillUnmount(): void {
        this.messagesController.closeConnection();
    }
}
