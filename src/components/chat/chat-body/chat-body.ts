import Block, { type BlockOwnProps } from "../../../framework/Block";
import Store from "../../../framework/store/Store";
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
            const chatActive = Store.getState().activeChat;
            if(!chatActive || (typeof chatActive)!== "number") return;
            this.setProps({isSelectedChat: !!chatActive})
        })
    }
}
