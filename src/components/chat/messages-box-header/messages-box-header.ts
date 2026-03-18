import "./messages-box-header.css";
import Block, { type BlockOwnProps } from "../../../framework/Block";
import MessagesBoxHeaderTemplate from "./messages-box-header.hbs?raw";

interface MessagesBoxHeaderProps extends BlockOwnProps{
    title: string;
    avatarUrl: string;
}

export default class MessagesBoxHeader extends Block<MessagesBoxHeaderProps>{
    static componentName = 'MessagesBoxHeader';
    protected template = MessagesBoxHeaderTemplate;

    protected componentDidMount(): void {
        this.setProps({title: "Приветственный чат"})
    }
}
