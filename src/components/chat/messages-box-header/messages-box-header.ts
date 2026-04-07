import "./messages-box-header.css";
import Block, { type BlockOwnProps } from "../../../framework/Block";
import MessagesBoxHeaderTemplate from "./messages-box-header.hbs?raw";
import PopupUser from "../popup-contents/popup-user/popup-user";
import Store from "../../../framework/store/Store";

interface MessagesBoxHeaderData{
    title: string;
    avatarUrl: string;
    userName: string;
}

interface MessagesBoxHeaderProps extends BlockOwnProps{
    data: MessagesBoxHeaderData;
    popupUserShow: (event: Event, el:HTMLButtonElement)=>void;
}

export default class MessagesBoxHeader extends Block<MessagesBoxHeaderProps>{
    static componentName = 'MessagesBoxHeader';
    protected template = MessagesBoxHeaderTemplate;

    constructor(props: MessagesBoxHeaderProps){
        super(props);

        this.setProps({
            popupUserShow: this.popupUserShow
        })

        Store.subscribe(()=>{
            this.updateData()
        })
    }

    updateData = ()=>{
        const activeChat = Store.getState().activeChat;

        if(!activeChat) return;
        this.setProps({
            data:{
                title: activeChat.title,
                avatarUrl: activeChat.avatarUrl ? activeChat.avatarUrl:"/img/avatar.png",
                userName: activeChat.created_by
            },
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
}
