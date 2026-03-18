import Block, { type BlockOwnProps } from "../../../framework/Block";
import { noError, validate, type formError } from "../../../services/validationService";
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
        //потом доделать валидацию
        const error:formError = validate(val, validators);
        this.children[1].setProps({message: error.text});
    }

    cleanValidate=()=>{
        const error:formError = noError;
        this.children[1].setProps({message: error.text});
    }
}
