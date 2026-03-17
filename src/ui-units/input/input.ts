import Block, {type BlockOwnProps }  from "../../framework/Block";
import InputTemplate from "./input.hbs?raw";

interface InputProps extends BlockOwnProps {
    id: string;
    name: string;
    className: string;
    type: string; //enum
    placeholder: string;
    value: string;
    required: boolean;
    ref: string;
    floatLabel?: (el:HTMLInputElement)=>void;
}

interface ValidatedElement{
    onValidate: (val:unknown)=>void;
    cleanValidate: ()=>void;
}

export default class Input extends Block<Partial<InputProps&ValidatedElement>>{
    static componentName = "Input";
    protected template = InputTemplate;

    protected events = {
        input: () => {
            const keys = Object.keys(this.refs);
            keys.forEach(el=>{
                if(this.refs[el] instanceof HTMLInputElement){
                    if(this.props.floatLabel){
                        this.props.floatLabel(this.refs[el]);
                    }
                }
            });
        },
        blur: () => {
            const keys = Object.keys(this.refs);
            keys.forEach(el=>{
                if(this.refs[el] instanceof HTMLInputElement){
                    if(this.props.onValidate){
                        this.props.onValidate(this.refs[el].value);
                    }
                }
            });
        },
        focus: ()=>{
            const keys = Object.keys(this.refs);
            keys.forEach(el=>{
                if(this.refs[el] instanceof HTMLInputElement){
                    if(this.props.cleanValidate){
                        this.props.cleanValidate();
                    }
                }
            })
        }
    };


}
