import "./chat-header.css";
import Block, { type BlockOwnProps } from "../../../framework/Block";
import ChatHeaderTemplate from "./chat-header.hbs?raw";
import AddChat from "../modal-contents/add-chat/add-chat";

interface ChatHeaderProps extends BlockOwnProps{
    openAddChatModal: ()=>void
}

export default class ChatHeader extends Block<ChatHeaderProps>{
    static componentName = 'ChatHeader';
    protected template = ChatHeaderTemplate;

    constructor(props: ChatHeaderProps){
        super(props)
        this.props.openAddChatModal=this.openAddChatModal
    }

    protected openAddChatModal=()=>{
        const modal = document.querySelector("#chat-modal");
        if(!modal || !( modal instanceof HTMLDialogElement)) return;
        modal.showModal();

        const content = new AddChat().element();

        if(content){
            modal.appendChild(content);
        }
    }
}
