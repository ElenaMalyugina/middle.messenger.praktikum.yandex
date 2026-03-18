import Block, { type BlockOwnProps } from "../../../framework/Block";
import { noError, validate, type formError } from "../../../services/validationService";
import ErrorMessage from "../../error-message/error-message";
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
