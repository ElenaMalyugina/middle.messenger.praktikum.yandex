import "./chat-item.css";
import Block, { type BlockOwnProps } from "../../../framework/Block";
import ChatItemTemplate from "./chat-item.hbs?raw";
import Store from "../../../framework/store/Store";
import type { ChatData } from "../../../types/chatData";
import ChatsController from "../../../controllers/chatsController";

export interface ChatItemProps extends BlockOwnProps{
    chatData: ChatData;
    isActive: boolean;
    deleteChatHandler: (e:Event)=>void;
}

export default class ChatItem extends Block<ChatItemProps>{
    static componentName = 'ChatItem';
    protected template = ChatItemTemplate;
    private chatsController = new ChatsController();

    constructor(props:ChatItemProps){
        super(props);

        this.props.deleteChatHandler = this.deleteChat

        Store.subscribe(()=>{
            this.setActive();
        })
    }

    protected events = {
        click: () => {
            Store.setState("activeChat", this.props.chatData);
        }
    }

    protected setActive = ()=>{
        const chatActive = Store.getState().activeChat as ChatData;
        if( !chatActive ) return;

        const chatActiveClass = "chat-item--active";

        const htmlElement = this.element();

        //Здесь нужно точечное воздействие на класс, не вызывающее перерисовку элемента
        if(this.props.chatData.id == chatActive.id){
            htmlElement?.classList.add(chatActiveClass)
        }
        else{
            htmlElement?.classList.remove(chatActiveClass)
        }
    }

    protected deleteChat = (e: Event)=>{
        e.preventDefault();
        e.stopPropagation();

        this.chatsController.deleteChat(this.props.chatData.id);
    }
}
