import Block, { type BlockOwnProps } from "../../framework/Block";
import type { BaseValidationMethods } from "../row-blocks/base-validation-block/base-validation-block";

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

export interface ValidatedElementProps{
    validators: string; //hbs так просто не принимает массив, пришлось отдельно выделять свойство
}

export type BaseValidatedInputProps = BaseInputProps & ValidatedElementProps & BaseValidationMethods;

export default abstract class BaseInput<T extends  BaseValidatedInputProps = BaseValidatedInputProps> extends Block<T>{
    protected events = {
        input: () => {
            const keys = Object.keys(this.refs);
            keys.forEach(el=>{
                if(this.isFormElement(this.refs[el])){
                    if(this.props.onInput){
                        this.props.onInput(this.refs[el]);
                    }
                }
            });
        },
        blur: () => {
            const keys = Object.keys(this.refs);
            keys.forEach(el=>{
                if(!this.props.validators) return;
                const validatorsArray= this.props.validators.split(",");

                if(!validatorsArray) return;
                if(this.isFormElement(this.refs[el])){
                    if(this.props.onValidate){
                        this.props.onValidate(this.refs[el].value, validatorsArray);
                    }
                }
            });
        },
        focus: ()=>{
            const keys = Object.keys(this.refs);
            keys.forEach(el=>{
                if(this.isFormElement(this.refs[el])){
                    if(this.props.cleanValidate){
                        this.props.cleanValidate();
                    }
                }
            })
        }
    };

    private isFormElement(el: unknown): el is HTMLInputElement | HTMLTextAreaElement {
        return el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement;
    }
}
