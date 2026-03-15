import Block, { type BlockOwnProps } from "../../../framework/Block";
import textRowBlockTemplate from "./text-row-block.hbs?raw";

interface TextRowBlockProps extends Partial<BlockOwnProps>{
    label: string;
    value: string;
}

export default class TextRowBlock extends Block<Partial<TextRowBlockProps>>{
    static componentName = 'TextRowBlock';
    protected template = textRowBlockTemplate;

    constructor(props: TextRowBlockProps){
        super(props)
    }
}
