import "./messages-list.css";
import Block, { type BlockOwnProps } from "../../../framework/Block";
import MessagesListTemplate from "./messages-list.hbs?raw";
import type { Message, MessageItemProps } from "../message-item/message-item";
import { messages } from "../../../mocks/messages";

interface MessagesListProps extends BlockOwnProps{
    messages: MessageItemProps[];
}

export default class MessagesList extends Block<MessagesListProps>{
    static componentName = 'MessagesList';
    protected template = MessagesListTemplate;

    constructor(props: MessagesListProps){
        super(props)
    }

    protected componentDidMount(): void {
        const thisMessages = [...messages];
        //добавление свойства смены даты
        const messagesWithIsChangedDate = thisMessages.map((mess: Message, i, sourceMessages )=>{

            const isChangedDate = i==0 || mess.time !== sourceMessages[i-1].time;

            const messageItem: MessageItemProps = {
                block: 'chat',
                message: {
                    ...mess,
                },
                isChangedDate: isChangedDate,
                isAuthor: mess.user_id === 111 // логика определения автора
            };

            return messageItem;
        })

        const resMessages = messagesWithIsChangedDate;

        this.setProps({
                messages: {...resMessages}
        });
    }
}
