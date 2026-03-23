import "./messages-box-header.css";
import Block, { type BlockOwnProps } from "../../../framework/Block";
import MessagesBoxHeaderTemplate from "./messages-box-header.hbs?raw";
import PopupUser from "../popup-contents/popup-user/popup-user";

const dataMock: MessagesBoxHeaderData = {
    title: "Приветственный чат",
    avatarUrl: "avatar.png",
    userName: "Иван Иванов"
}

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

    popupUserShow=(event: Event, el: HTMLButtonElement)=>{
        if(!el) return;
        const activeClass = "dots-button--active";
        el.classList.add(activeClass);

        const popup = this.children.find(el=> el instanceof PopupUser);
        if(popup){
            popup.popupShow(event, "#user-button", activeClass);
        }
    }

    protected componentDidMount(): void {
        this.setProps({
            data:{...dataMock},
            popupUserShow: this.popupUserShow
        })
    }
}
