import "./chats-list.css";
import Block, { type BlockOwnProps } from "../../../framework/Block";
import type { ChatItemProps } from "../chat-item/chat-item";
import ChatsListTemplate from "./chats-list.hbs?raw";
import ChatsController from "../../../controllers/chatsController";
import Store from "../../../framework/store/Store";
import { ChatDataModel, type ChatData } from "../../../types/chatData";
import { ChatsService } from "../../../services/chatsService";

interface ChatsListProps extends BlockOwnProps{
    chats: ChatItemProps[];
}

window.intervals = [];

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

    protected render(): void {
        super.render()
        if(!this.intervalId){
            this.intervalId = setInterval(
                ()=>{
                    console.log("tick");
                    const queryString = Store.getState().queryString as string;
                    this.chatsController.getChats(queryString);
                },
                20000
            );

            window.intervals.push(this.intervalId);
        }
    }

    protected componentWillUnmount(): void {
        window.intervals.forEach(el=>{
            clearInterval(el);
        })
        this.intervalId = null;
    }

    protected updateChats = ()=>{
        const chatsList = Store.getState().chats as ChatData[];
        if(!chatsList ||! Array.isArray(chatsList)) return;

        const activeChat = ChatsService.getActiveChat();

        const buildedChat = chatsList.map(chat => ({
                chatData: new ChatDataModel(chat),
                isActive: chat.id === activeChat?.id || false,
        }))

        this.setProps({
            chats: buildedChat
        })
    }
}
