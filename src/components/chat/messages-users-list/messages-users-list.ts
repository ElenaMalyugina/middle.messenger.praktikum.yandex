import "./messages-users-list.css";
import Store from "../../../framework/store/Store";
import type { ChatData } from "../../../types/chatData";
import Block, { type BlockOwnProps } from "./../../../framework/Block";
import MessagesUsersListTemplate from "./messages-users-list.hbs?raw";
import ChatUsersController from "../../../controllers/chatUsersController";
import type { UserInfo } from "../../../types/userInfo";
import { UserService } from "../../../services/userService";
import { ChatsService } from "../../../services/chatsService";

interface MessagesUsersListProps extends BlockOwnProps{
    users: UserInfo[];
}

export default class MessagesUsersList extends Block<MessagesUsersListProps>{
    static componentName = 'MessagesUsersList';
    protected template = MessagesUsersListTemplate;
    private chatUsersController = new ChatUsersController();

    constructor(props: MessagesUsersListProps){
        super(props)
        this.props.users = [];

        this.getChatUsers();
    }

    protected componentDidMount(): void {
        this.removeStoreListeners = Store.subscribe(
            this.updateUserList
        )
    }

    protected getChatUsers = ()=>{
        const currentChat = ChatsService.getActiveChat();
        if(!currentChat) return;
        this.chatUsersController.getChatUsers(currentChat.id);
    }

    protected updateUserList = ()=>{
        const currentUser = UserService.getCurrentUser();
        if(!currentUser) return;
        const users = Store.getState().ActiveChatsUsers;

        if(!Array.isArray(users)) return;

        const sortedUsers = this.buildUsersList(users, currentUser);

        this.setProps({users: sortedUsers})
    }


    private buildUsersList = (users: UserInfo[], currentUser: {})=>{
        const sortedUsers = users.reduce((acc, user) => {
            if (user.id === currentUser) {
                acc.unshift(
                    { ...user, login: "Вы" }
                );
            } else {
                acc.push(
                    { ...user }
                );
            }
            return acc;
        }, [] as typeof users);

        return sortedUsers;
    }

    protected componentWillUnmount(): void {
        this.removeStoreListeners()
    }

}
