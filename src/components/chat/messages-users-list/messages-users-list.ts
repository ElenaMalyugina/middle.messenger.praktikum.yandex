import "./messages-users-list.css";
import ChatsController from "../../../controllers/chatsController";
import Store from "../../../framework/store/Store";
import type { ChatData } from "../../../types/chatData";
import Block, { type BlockOwnProps } from "./../../../framework/Block";
import MessagesUsersListTemplate from "./messages-users-list.hbs?raw";

interface MessagesUsersListProps extends BlockOwnProps{
    users: unknown[];
}

export default class MessagesUsersList extends Block<MessagesUsersListProps>{
    static componentName = 'MessagesUsersList';
    protected template = MessagesUsersListTemplate;
    private chatsController = new ChatsController();

    constructor(props: MessagesUsersListProps){
        super(props)
        this.props.users = [];

        Store.subscribe(
            ()=>{
                const users = Store.getState().ActiveChatsUsers;
                if(!Array.isArray(users)) return;
                this.setProps({users: users})
            }
        )
    }

    protected componentDidMount(): void {
        const currentChat = Store.getState().activeChat as ChatData;

        this.chatsController.getChatUsers(currentChat.id);
    }

}
