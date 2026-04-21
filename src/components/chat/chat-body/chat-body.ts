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
    private messagesController = new MessagesController();


    constructor(props: ChatBodyProps){
        super(props);
        Store.subscribe(()=>{
            this.socketConnect();
        })
    }

    socketConnect=()=>{
        const activeChat = ChatsService.getActiveChat() as ChatData;

        if(activeChat && (activeChat.id === this.props.currentChatId)) return;

        if(!activeChat) {
            this.messagesController.closeConnection();

            this.setProps({
                currentChatId: null,
                isSelectedChat: false
            });
        }
        else if(this.props.currentChatId !== activeChat.id){
            this.messagesController.startConnection(activeChat.id);

            this.setProps({
                currentChatId: activeChat.id,
                isSelectedChat: true
            });
        }
    }


}
