import BaseValidationBlock, { type BaseValidationProps } from "../base-validation-block/base-validation-block";
import TextareBlockTemplate from "./textarea-block.hbs?raw";

interface TextareaBlockProps extends BaseValidationProps{
    block: string;
    type: string;
    label: string;
    name: string;
}

export default class TextareaBlock extends BaseValidationBlock<TextareaBlockProps>{
    static componentName = 'TextareaBlock';
    protected template = TextareBlockTemplate;

    constructor(props: TextareaBlockProps){
        super(props);

        this.setProps({
            onValidate: this.onValidate,
            cleanValidate: this.cleanValidate
        })
    }

}
