import "./messages-box-header.css";
import Block, { type BlockOwnProps } from "../../../framework/Block";
import MessagesBoxHeaderTemplate from "./messages-box-header.hbs?raw";
import PopupUser from "../popup-contents/popup-user/popup-user";
import Store from "../../../framework/store/Store";
import { UserService } from "../../../services/userService";
import { ChatsService } from "../../../services/chatsService";


interface MessagesBoxHeaderData{
    title: string;
    avatarUrl: string;
}

interface MessagesBoxHeaderProps extends BlockOwnProps{
    data: MessagesBoxHeaderData;
    isOwnChat: boolean;
    popupUserShow: (event: Event, el:HTMLButtonElement)=>void;
}

export default class MessagesBoxHeader extends Block<MessagesBoxHeaderProps>{
    static componentName = 'MessagesBoxHeader';
    protected template = MessagesBoxHeaderTemplate;

    constructor(props: MessagesBoxHeaderProps){
        super(props);
        this.props.popupUserShow = this.popupUserShow

    }

    protected componentDidMount(): void {
        this.removeStoreListeners =  Store.subscribe(
            this.updateData
        )
    }

    protected events={
        click: (__e: Event)=>{
            Store.setState("chatAvatarError", "")
        }
    };

    updateData = ()=>{
        const activeChat= ChatsService.getActiveChat();
        if(!activeChat) return;

        this.setProps({
            data:{
                title: activeChat.title,
                avatarUrl: activeChat.avatar,
            },
            isOwnChat: activeChat.created_by === UserService.getCurrentUser()
        })
    }

    popupUserShow=(event: Event, el: HTMLButtonElement)=>{
        if(!el) return;
        const activeClass = "dots-button--active";
        el.classList.add(activeClass);

        const popup = this.children.find(el=> el instanceof PopupUser);
        if(popup){
            popup.popupShow(event, "#user-button", activeClass);
        }
    }

    protected componentWillUnmount(): void {
        this.removeStoreListeners();
    }
}
