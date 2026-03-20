import "./chats-list.css";
import Block, { type BlockOwnProps } from "../../../framework/Block";
import type { ChatItemProps } from "../chat-item/chat-item";
import ChatsListTemplate from "./chats-list.hbs?raw";
import { chats } from "../../../mocks/chats";
import ChatItem from "../chat-item/chat-item";

interface ChatsListProps extends BlockOwnProps{
    chats: ChatItemProps[];
    setSelectedChat: ()=>void;
    selectedChatEmit:(id: number)=>void;
}

export default class ChatsList extends Block<ChatsListProps>{
    static componentName = 'ChatsList';
    protected template = ChatsListTemplate;

    constructor(props: ChatsListProps){
        super(props);
    }

    protected selectChat=(id: number)=>{
        this.children.forEach(chatItem=>{
            if (chatItem instanceof ChatItem) {
                const isActive = chatItem.getId() === id;
                chatItem.setProps({isActive: isActive});
            }
        })

        //прокидываем событие наверх
        if(this.props.selectedChatEmit){
            this.props.selectedChatEmit(id);
        }
    }

    protected componentDidMount(): void {
        this.setProps({
            chats: chats.map(chat => ({
                chatData:{
                    ...chat,
                },
                isActive: false,
                selectChatEmit: this.selectChat
            }))
        });
    }
}
