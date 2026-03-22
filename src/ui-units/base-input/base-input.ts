import Block, { type BlockOwnProps } from "../../framework/Block";
import type { BaseValidationProps } from "../row-blocks/base-validation-block/base-validation-block";

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

export type BaseValidatedInputProps = BaseInputProps & BaseValidationProps;

export default abstract class BaseInput<Props extends  BaseValidatedInputProps = BaseValidatedInputProps> extends Block<Props>{
    protected events = {
        input: () => {
            const keys = Object.keys(this.refs);
            const input = this.refs[keys[0]];
            if(this.props.onInput){
                this.props.onInput(input);
            }
        },
        blur: () => {
            const keys = Object.keys(this.refs);
            const input = this.refs[keys[0]];

            if(!this.props.validators) return;
            const validatorsArray= this.props.validators.split(",");
            if(!validatorsArray) return;

            if(this.isFormElement(input)){
                if(this.props.onValidate){
                    this.props.onValidate(input.value, validatorsArray);
                }
            }
        },
        focus: ()=>{
            if(this.props.cleanValidate){
                this.props.cleanValidate();
            }
        }
    }

    private isFormElement(el: unknown): el is HTMLInputElement | HTMLTextAreaElement {
        return el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement;
    }

}
