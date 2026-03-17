import Block, { type BlockOwnProps } from "../../../framework/Block";
import ChatBodyTemplate from "./chat-body.hbs?raw";

interface ChatBodyProps extends BlockOwnProps{
    isSelectedChat: boolean;
}

export default class ChatBody extends Block<Partial<ChatBodyProps>>{
    static componentName = 'ChatBody';
    protected template = ChatBodyTemplate;


}
