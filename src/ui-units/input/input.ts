import BaseInput, { type BaseValidatedInputProps } from "../base-input/base-input";
import InputTemplate from "./input.hbs?raw";

type inputTypes = "text" | "password"; //дополнитть по мере приименения

interface InputProps extends BaseValidatedInputProps {
    type: inputTypes;
}

export default class Input extends BaseInput<InputProps>{
    static componentName = "Input";
    protected template = InputTemplate;
}
