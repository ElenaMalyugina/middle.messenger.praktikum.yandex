import Block, { type BlockOwnProps } from "../../../framework/Block";
import { initialError, validateRequired, type formError } from "../../../services/validationService";
import textRowEditableTemplate from "./text-row-editable.hbs?raw";

interface TextRowEditableProps extends Partial<BlockOwnProps>{
    block: string;
    type: string;
    label: string;
    name: string;
    value: string;
    errorText: string | null;
    onValidate: (val:unknown)=>void;
    cleanValidate: ()=>void;
}

export default class TextRowEditable extends Block<Partial<TextRowEditableProps>>{
    static componentName = 'TextRowEditable';
    protected template = textRowEditableTemplate;

    constructor(props:TextRowEditableProps){
        super(props);
        this.setProps({
            onValidate: this.onValidate,
            cleanValidate: this.cleanValidate,
        });
    }

    onValidate=(val:unknown)=>{
        //потом доделать валидацию
        const error:formError = validateRequired(val);
        const errorTextBlock = this.refs["error"];
        if(!errorTextBlock) return;
        errorTextBlock.textContent = error.text;
        //this.setProps({errorText: errorText});
    }

    cleanValidate=()=>{
        const error:formError = initialError;
        const errorTextBlock = this.refs["error"];
        if(!errorTextBlock) return;
        errorTextBlock.textContent = error.text;
        //this.setProps({errorText: errorText});
    }

}
