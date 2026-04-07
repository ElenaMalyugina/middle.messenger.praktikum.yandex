import "./chats-list.css";
import Block, { type BlockOwnProps } from "../../../framework/Block";
import type { ChatItemProps } from "../chat-item/chat-item";
import ChatsListTemplate from "./chats-list.hbs?raw";
import ChatsController from "../../../controllers/chatsController";
import Store from "../../../framework/store/Store";

interface ChatsListProps extends BlockOwnProps{
    chats: ChatItemProps[];
}

export default class ChatsList extends Block<ChatsListProps>{
    static componentName = 'ChatsList';
    protected template = ChatsListTemplate;
    private chatsController =  new ChatsController();

    constructor(props: ChatsListProps){
        super(props);

        Store.subscribe(()=>{
            this.updateChats();
        })
    }

    protected updateChats = ()=>{
        const chatsList = Store.getState().chats;
        if(!chatsList ||! Array.isArray(chatsList) ) return;

        this.setProps({
            chats: chatsList.map(chat => ({
                chatData:{
                    ...chat,
                    avatar: chat.avatar ? chat.avatar : "/img/avatar.png"
                },
                isActive: false,
            }))
        });
    }

    protected componentDidMount(): void {
        this.chatsController.getChats();
    }
}
