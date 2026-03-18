import Block, { type BlockOwnProps } from "../../framework/Block";

export interface BaseInputProps extends BlockOwnProps {
    id: string;
    name: string;
    className: string;
    placeholder: string;
    value: string;
    required: boolean;
    ref: string;
    onInput?: (val:unknown)=>unknown;
}

export interface ValidatedElement{
    onValidate?: (val:unknown)=>void;
    cleanValidate?: ()=>void;
}

export type BaseValidatedInputProps = BaseInputProps&ValidatedElement;

export default abstract class BaseInput<T extends  BaseValidatedInputProps = BaseValidatedInputProps> extends Block<T>{
    protected events = {
        input: () => {
            const keys = Object.keys(this.refs);
            keys.forEach(el=>{
                if(this.refs[el] instanceof (HTMLInputElement || HTMLTextAreaElement)){
                    if(this.props.onInput){
                        this.props.onInput(this.refs[el]);
                    }
                }
            });
        },
        blur: () => {
            const keys = Object.keys(this.refs);
            keys.forEach(el=>{
                if(this.refs[el] instanceof HTMLInputElement || this.refs[el] instanceof HTMLTextAreaElement){
                    debugger
                    if(this.props.onValidate){
                        this.props.onValidate(this.refs[el].value);
                    }
                }
            });
        },
        focus: ()=>{
            const keys = Object.keys(this.refs);
            keys.forEach(el=>{
                if(this.refs[el] instanceof HTMLInputElement || this.refs[el] instanceof HTMLTextAreaElement){
                    if(this.props.cleanValidate){
                        this.props.cleanValidate();
                    }
                }
            })
        }
    };
}
