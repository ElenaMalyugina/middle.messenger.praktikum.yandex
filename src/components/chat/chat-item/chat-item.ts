import "./chat-item.css";
import Block, { type BlockOwnProps } from "../../../framework/Block";
import ChatItemTemplate from "./chat-item.hbs?raw";
import Store from "../../../framework/store/Store";

export interface ChatData{
    id: number;
    title: string;
    avatar: string;
    unread_count:number;
    created_by: number;
    last_message:{
        time:string;
        text: string;
    };
}

export interface ChatItemProps extends BlockOwnProps{
    chatData: ChatData;
    isActive: boolean;
}

export default class ChatItem extends Block<ChatItemProps>{
    static componentName = 'ChatItem';
    protected template = ChatItemTemplate;

    constructor(props:ChatItemProps){
        super(props);

        Store.subscribe(()=>{
            this.setActive();
        })
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

    protected events = {
        click: () => {
            Store.setState("activeChat", this.props.chatData);
        }
    }

}
