import Block, {type BlockOwnProps }  from "../../framework/Block";
import linkTemplate from "./link.hbs?raw";

interface LinkProps extends BlockOwnProps{
    id: string;
    className: string;
    href: string;
    text: string;
}

export default class Link extends Block<Partial<LinkProps>>{
    static componentName = 'Link';
    protected template = linkTemplate;
}
