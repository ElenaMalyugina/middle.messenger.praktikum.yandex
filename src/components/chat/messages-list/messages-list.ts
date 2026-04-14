import "./messages-list.css";
import Block, { type BlockOwnProps } from "../../../framework/Block";
import MessagesListTemplate from "./messages-list.hbs?raw";
import type { Message, MessageItemProps } from "../message-item/message-item";
//import { messages } from "../../../mocks/messages";
import MessagesController from "../../../controllers/messagesController";
import Store from "../../../framework/store/Store";
import type { ChatData } from "../../../types/chatData";

interface MessagesListProps extends BlockOwnProps{
    messages: MessageItemProps[];
}

export default class MessagesList extends Block<MessagesListProps>{
    static componentName = 'MessagesList';
    protected template = MessagesListTemplate;
    private messagesController = new MessagesController();

    constructor(props: MessagesListProps){
        super(props);

        Store.subscribe(()=>{
            this.setProps({messages: []});
            const activeChat= Store.getState().activeChat as ChatData;
            if(!activeChat) return;
            this.messagesController.startConnecton(activeChat.id);

            const messages = Store.getState().messages as Message[];
            if(!messages) return;
            this.getChats(messages)
        })


        //this.messagesController.startConnecton(currentChatId);
    }

    protected getChats(messages: Message[]): void {
        const thisMessages = [...messages];
        const currentUserId = Store.getState().currentUser as number;
        if(!currentUserId) return;
        //добавление свойства смены даты
        const messagesWithIsChangedDate = thisMessages.map((mess: Message, i, sourceMessages )=>{

            const isChangedDate = i==0 || mess.time !== sourceMessages[i-1].time;

            const messageItem: MessageItemProps = {
                block: 'chat',
                message: {
                    ...mess,
                },
                isChangedDate: isChangedDate,
                isAuthor: mess.user_id === currentUserId // логика определения автора
            };

            return messageItem;
        })

        const resMessages = messagesWithIsChangedDate;

        this.setProps({
                messages: {...resMessages}
        });
    }
}
