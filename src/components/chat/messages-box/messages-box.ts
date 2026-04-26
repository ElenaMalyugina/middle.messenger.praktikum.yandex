import "./messages-box.css";
import MessagesBoxTemplate from "./messages-box.hbs?raw";
import Block, { type BlockOwnProps } from "../../../framework/Block";
import MessagesController from "../../../controllers/messagesController";
import Store from "../../../framework/store/Store";
import { ChatData } from "../../../types/chatData";
import { ChatsService } from "../../../services/chatsService";

export default class MessagesBox extends Block<BlockOwnProps>{
    static componentName = 'MessagesBox';
    protected template = MessagesBoxTemplate;
    private messagesController = MessagesController;
    private currentChatId = -1;


    protected componentDidMount(): void {
        this.removeStoreListeners = Store.subscribe(
            this.socketConnect
        )
    }

    socketConnect=()=>{
        const activeChat = ChatsService.getActiveChat() as ChatData;
        if(!activeChat || !activeChat.id || this.currentChatId == activeChat.id) return;

        this.messagesController.startConnection(activeChat.id);
        this.currentChatId = activeChat.id
    }

    protected componentWillUnmount(): void {
        this.removeStoreListeners();
        this.messagesController.closeConnection();
    }
}

