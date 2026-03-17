import "./chats-list.css";
import Block, { type BlockOwnProps } from "../../../framework/Block";
import type { ChatItemProps } from "../chat-item/chat-item";
import ChatsListTemplate from "./chats-list.hbs?raw";
import { chats } from "../../../mocks/chats";

interface ChatsListProps extends BlockOwnProps{
    chats: ChatItemProps[];
    setSelectedChat: ()=>void;
    setSelectedChatProps:()=>void;
}

export default class ChatsList extends Block<Partial<ChatsListProps>>{
    static componentName = 'ChatsList';
    protected template = ChatsListTemplate;

    constructor(props: ChatsListProps){
        super(props);
    }

    protected selectChat=(id: number)=>{
        this.children.forEach(chatItem=>{
            const isActive = chatItem.props.id === id;
            chatItem.setProps({isActiveClass: isActive});
        })
        this.props.setSelectedChat()
    }

    protected componentDidMount(): void {
        this.setProps({
            chats: chats.map(chat => ({
                ...chat,
                selectChatEmit: this.selectChat
            }))
        });
    }
}
