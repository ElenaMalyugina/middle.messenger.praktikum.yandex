import Block, {type BlockOwnProps }  from "../../framework/Block";
import imgTemplate from "./img.hbs?raw";

interface InputProps extends BlockOwnProps {
    id: string;
    className: string;
    src: string;
    alt: string;
    ref: string;
    width: number;
    height: number;
}

export default class Img extends Block<Partial<InputProps>>{
    static componentName = "Img";
    protected template = imgTemplate;

}
