import Block, { type BlockOwnProps } from "../../framework/Block";
import ErrorMessageTemplate from "./error-message.hbs?raw";

interface ErrorMessageProps extends BlockOwnProps{
    id:string;
    className: string;
    message: string;
    ref: string;
}

export default class ErrorMessage extends Block<Partial<ErrorMessageProps>>{
    static componentName = "ErrorMessage";
    protected template = ErrorMessageTemplate;


}
