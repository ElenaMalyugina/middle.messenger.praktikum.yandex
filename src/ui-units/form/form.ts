import Block, {type BlockOwnProps }  from "../../framework/Block";
import Store from "../../framework/store/Store";
import ErrorMessage from "../error-message/error-message";

export interface FormProps extends BlockOwnProps{
    id: string;
    className: string;
    action: string;
    method: string;
    ref: string;
    data: unknown;
}

export default abstract class Form <Props extends FormProps = FormProps> extends Block<Props>{
    protected abstract submitForm: (form: Form)=>void

    protected events = {
        submit: (event: Event) => {
            event.preventDefault();
            this.submitForm(this);
        },

    }

}
