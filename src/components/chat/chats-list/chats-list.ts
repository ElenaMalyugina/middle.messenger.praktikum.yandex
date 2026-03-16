import "./chats-list.css";
import Block, { type BlockOwnProps } from "../../../framework/Block";
import type { ChatItemProps } from "../chat-item/chat-item";
import ChatsListTemplate from "./chats-list.hbs?raw";
import { chats } from "../../../mocks/chats";


interface ChatsListProps extends BlockOwnProps{
    chats: ChatItemProps[];
}

export default class ChatsList extends Block<Partial<ChatsListProps>>{
    static componentName = 'ChatsList';
    protected template = ChatsListTemplate;

    constructor(props: ChatsListProps){
        super(props);

        this.setProps({chats: [...chats]})
    }

}
