import Block, { type BlockOwnProps } from "../../../framework/Block";
import { initialError, validateRequired, type formError } from "../../../services/validationService";
import TextareBlockTemplate from "./textarea-block.hbs?raw";

interface TextareaBlockProps extends BlockOwnProps{
    block: string;
    type: string;
    label: string;
    name: string;
    errorMessage: string | null;
    onValidate: (val:unknown)=>void;
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

    onValidate=(val:unknown)=>{
        //потом доделать валидацию
        const error:formError = validateRequired(val);
        this.setProps({errorMessage: error.text});
    }

    cleanValidate=()=>{
        const error:formError = initialError;
        this.setProps({errorMessage: error.text});
    }
}
