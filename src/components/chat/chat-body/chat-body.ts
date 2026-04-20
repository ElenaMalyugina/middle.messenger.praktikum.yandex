import Block, { type BlockOwnProps } from "../../../framework/Block";
import Store from "../../../framework/store/Store";
import type { ChatData } from "../../../types/chatData";
//import type { ChatData } from "../../../types/chatData";
import ChatBodyTemplate from "./chat-body.hbs?raw";

interface ChatBodyProps extends BlockOwnProps{
    isSelectedChat: boolean;
}

export default class ChatBody extends Block<ChatBodyProps>{
    static componentName = 'ChatBody';
    protected template = ChatBodyTemplate;

    constructor(props: ChatBodyProps){
        super(props);

        Store.subscribe(()=>{
            this.toggleMessageBoxVisual();
        })
    }

    toggleMessageBoxVisual = ()=>{
        const chatActive = Store.getState().activeChat as ChatData;
        if(!chatActive ) return;

        if(!this.props.isSelectedChat){
            this.setProps({isSelectedChat: !!chatActive.id})
        }
    }
}
