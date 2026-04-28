import Block from "../../../framework/Block";
import Store from "../../../framework/store/Store";
import { ChatsService } from "../../../services/chatsService";
import { ChatDataModel } from "../../../types/chatData";
import MessagesBox from "../messages-box/messages-box";
import NoMessages from "../no-messages/no-messages";
import ChatBodyTemplate from "./chat-body.hbs?raw";

export default class ChatBody extends Block{
    static componentName = 'ChatBody';
    protected template = ChatBodyTemplate;
    private selectedChatId: number = -1;

    protected componentDidMount(): void {
        this.removeStoreListeners = Store.subscribe(
            this.toggleView
        )
    }

    toggleView=()=>{
        const activeChat = ChatsService.getActiveChat();
        const messagesBox = this.children.find(el=> el instanceof MessagesBox);
        const noMessages = this.children.find(el=> el instanceof NoMessages);

        if(!activeChat || !(activeChat instanceof ChatDataModel)){
            messagesBox?.hide();
            noMessages?.renderDom("#chat-body");
            return
        }

        if(activeChat.id == this.selectedChatId) return;

        this.selectedChatId = activeChat.id;

        if(!this.selectedChatId) {
            messagesBox?.hide();
            noMessages?.renderDom("#chat-body");
        }
        else{
            messagesBox?.renderDom("#chat-body");
            noMessages?.hide();
        }
    }

    protected componentWillUnmount(): void {
        this.removeStoreListeners();
    }
}
