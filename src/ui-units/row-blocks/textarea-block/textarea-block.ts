import Block, { type BlockOwnProps } from "../../../framework/Block";
import { noError, validate, type formError } from "../../../services/validationService";
import ErrorMessage from "../../error-message/error-message";
import TextareBlockTemplate from "./textarea-block.hbs?raw";

interface TextareaBlockProps extends BlockOwnProps{
    block: string;
    type: string;
    label: string;
    name: string;
    errorMessage: string | null;
    validators: string[];
    onValidate: (val:unknown, validators: string[])=>void;
    cleanValidate: ()=>void;
    onInput: (el:HTMLInputElement)=>void;
}

export default class TextareaBlock extends Block<TextareaBlockProps>{
    static componentName = 'TextareaBlock';
    protected template = TextareBlockTemplate;

    constructor(props: TextareaBlockProps){
        super(props);

        this.setProps({
            onValidate: this.onValidate,
            cleanValidate: this.cleanValidate
        })
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
