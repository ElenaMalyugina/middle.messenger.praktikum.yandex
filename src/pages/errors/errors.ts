import "./errors.css";
import Block, {type BlockOwnProps } from "../../framework/Block";
import ErrorsTemplate from "./errors.hbs?raw";

interface ErrorProps extends BlockOwnProps {
    code: number;
    text: string;
}

export default class Errors extends Block<Partial<ErrorProps>>{
    static componentName = "Errors";
    protected template = ErrorsTemplate;
}

