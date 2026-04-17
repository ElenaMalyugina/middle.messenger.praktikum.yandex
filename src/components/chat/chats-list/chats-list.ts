import "./chats-list.css";
import Block, { type BlockOwnProps } from "../../../framework/Block";
import type { ChatItemProps } from "../chat-item/chat-item";
import ChatsListTemplate from "./chats-list.hbs?raw";
import ChatsController from "../../../controllers/chatsController";
import Store from "../../../framework/store/Store";
import { ChatDataModel } from "../../../types/chatData";

interface ChatsListProps extends BlockOwnProps{
    chats: ChatItemProps[];
}

export default class ChatsList extends Block<ChatsListProps>{
    static componentName = 'ChatsList';
    protected template = ChatsListTemplate;
    private chatsController =  new ChatsController();
    private intervalId: number | null = null;

    constructor(props: ChatsListProps){
        super(props);
        Store.subscribe(()=>{
            this.updateChats();
        });
        this.chatsController.getChats();

    }

    protected componentDidMount(): void {
        this.intervalId = setInterval(
            ()=>this.chatsController.getChats(), 10000
        );
    }

    protected componentWillUnmount(): void {
        if (this.intervalId !== null) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    protected updateChats = ()=>{
        const chatsList = Store.getState().chats;
        if(!chatsList ||! Array.isArray(chatsList) ) return;

        this.setProps({
            chats: chatsList.map(chat => ({
                chatData: new ChatDataModel(chat),
                isActive: false,
            }))
        });
    }
}
