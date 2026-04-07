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
    errorType: string;
}

export default abstract class Form <Props extends FormProps = FormProps> extends Block<Props>{
    protected abstract submitForm: (form: Form )=>void;
    protected get errorBlock(): ErrorMessage | null {
        return this.children.find(el=> el instanceof ErrorMessage) || null;
    };

    protected events = {
        submit: (event: Event) => {
            event.preventDefault();
            this.submitForm(this);
        },
        click: (event: Event)=>{
            if(event.target instanceof HTMLInputElement){
                if(Store){
                    const store= Store.getState();
                    if(store[this.props.errorType]){
                        Store.setState(`${this.props.errorType}`, "");
                    }
                }
            }
        }
    }

    errorFormHandler = ()=>{
        const formError = Store.getState()[this.props.errorType];

        if(formError && typeof formError == "string"){
            this.errorBlock && this.errorBlock.setProps({message: formError});
        }
    }
}
