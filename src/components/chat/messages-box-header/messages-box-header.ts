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
}

export default class MessagesBoxHeader extends Block<MessagesBoxHeaderProps>{
    static componentName = 'MessagesBoxHeader';
    protected template = MessagesBoxHeaderTemplate;

    protected componentDidMount(): void {
        this.setProps({
            data:{...dataMock}
        })
    }
}
