import "./messages-box.css";
import MessagesBoxTemplate from "./messages-box.hbs?raw";
import Block, { type BlockOwnProps } from "../../../framework/Block";

export default class MessagesBox extends Block<BlockOwnProps>{
    static componentName = 'MessagesBox';
    protected template = MessagesBoxTemplate;


}

