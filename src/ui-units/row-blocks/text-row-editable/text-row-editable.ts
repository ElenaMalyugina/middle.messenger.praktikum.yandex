import "./text-row-editable.css";
import Block, { type BlockOwnProps } from "../../../framework/Block";
import { noError, validate, type formError } from "../../../services/validationService";
import textRowEditableTemplate from "./text-row-editable.hbs?raw";
import ErrorMessage from "../../error-message/error-message";
import type { BaseValidationProps } from "../base-validation-block/base-validation-block";
import BaseValidationBlock from "../base-validation-block/base-validation-block";

interface TextRowEditableProps extends BaseValidationProps{
    type: string;
    label: string;
    name: string;
    value?: string;
}

export default class TextRowEditable extends BaseValidationBlock<TextRowEditableProps>{
    static componentName = 'TextRowEditable';
    protected template = textRowEditableTemplate;

    constructor(props:TextRowEditableProps){
        super(props);
        this.setProps({
            onValidate: this.onValidate,
            cleanValidate: this.cleanValidate,
        });
    }

}
