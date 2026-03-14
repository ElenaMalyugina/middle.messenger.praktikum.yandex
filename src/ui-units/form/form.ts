import Block, {type BlockOwnProps }  from "../../framework/Block";
import { tempSubmitHandler } from "../../framework/FormHandler";

interface FormProps extends BlockOwnProps{
    id: string;
    className: string;
    action: string;
    method: string;
    ref: string;
}

export default abstract class Form extends Block<Partial<FormProps>>{
    protected events = {
        submit: (event: Event) => {
            event.preventDefault();
            tempSubmitHandler(this.refs);
        },
    };

}
