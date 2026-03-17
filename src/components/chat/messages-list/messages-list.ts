import "./messages-list.css";
import Block, { type BlockOwnProps } from "../../../framework/Block";
import MessagesListTemplate from "./messages-list.hbs?raw";
import type { MessageItemProps } from "../message-item/message-item";
import { messages } from "../../../mocks/messages";

interface MessagesListProps extends BlockOwnProps{
    messages: MessageItemProps[];
}

export default class MessagesList extends Block<Partial<MessagesListProps>>{
    static componentName = 'MessagesList';
    protected template = MessagesListTemplate;

    constructor(props: MessagesListProps){
        super(props)
    }

    protected componentDidMount(): void {
        const thisMessages = [...messages];
        //добавление свойства смены даты
        const messagesWithIsChangedDate = thisMessages.map((mess:any, i, sourceMessages)=>{
            mess.isChangedDate = false;
            const isChangedDate = i==0 || mess.time !== sourceMessages[i-1].time;

            if(isChangedDate){
                mess.isChangedDate = true;
            }
            mess.isAuthor = mess.user_id === 111; /*доделать тип*/
            return mess;
        })

        const resMessages = messagesWithIsChangedDate;

        this.setProps({messages: resMessages });
    }
}
