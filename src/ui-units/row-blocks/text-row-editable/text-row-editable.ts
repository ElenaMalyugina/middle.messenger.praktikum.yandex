import "./text-row-editable.css";
import Block, { type BlockOwnProps } from "../../../framework/Block";
import { noError, validate, type formError } from "../../../services/validationService";
import textRowEditableTemplate from "./text-row-editable.hbs?raw";
import ErrorMessage from "../../error-message/error-message";

interface TextRowEditableProps extends BlockOwnProps{
    type: string;
    label: string;
    name: string;
    value?: string;
    validators: string;
    errorMessage?: string | null;
    onValidate?: (val:unknown, validators: string[])=>void;
    cleanValidate?: ()=>void;
}

export default class TextRowEditable extends Block<TextRowEditableProps>{
    static componentName = 'TextRowEditable';
    protected template = textRowEditableTemplate;

    constructor(props:TextRowEditableProps){
        super(props);
        this.setProps({
            onValidate: this.onValidate,
            cleanValidate: this.cleanValidate,
        });
    }

    onValidate=(val:unknown, validators: string[])=>{
        const error:formError = validate(val, validators);
        const errorMessageBlock= this.children.find(el=> el instanceof ErrorMessage);

        if(errorMessageBlock){
            errorMessageBlock.setProps({message: error.text});
        }
    }

    cleanValidate=()=>{
        const error:formError = noError;
        const errorMessageBlock= this.children.find(el=> el instanceof ErrorMessage);

        if(errorMessageBlock){
            errorMessageBlock.setProps({message: error.text});
        }
    }

}
