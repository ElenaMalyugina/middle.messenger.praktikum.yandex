import Block, {type BlockOwnProps } from "../../framework/Block";
import "./errors.css";
import ErrorsTemplate from "./errors.hbs?raw";

interface ErrorProps extends BlockOwnProps {
    code: number;
    text: string;
}

class Errors extends Block<Partial<ErrorProps>>{
    static componentName = "Errors";
    protected template = ErrorsTemplate;

}

export default Errors;
