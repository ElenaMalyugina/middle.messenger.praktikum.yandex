import "./messages-users-list.css";
import Store from "../../../framework/store/Store";
import type { ChatData } from "../../../types/chatData";
import Block, { type BlockOwnProps } from "./../../../framework/Block";
import MessagesUsersListTemplate from "./messages-users-list.hbs?raw";
import ChatUsersController from "../../../controllers/chatUsersController";

interface MessagesUsersListProps extends BlockOwnProps{
    users: unknown[];
}

export default class MessagesUsersList extends Block<MessagesUsersListProps>{
    static componentName = 'MessagesUsersList';
    protected template = MessagesUsersListTemplate;
    private chatUsersController = new ChatUsersController();

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
        this.chatUsersController.getChatUsers(currentChat.id);
    }

}
