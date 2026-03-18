import type { BaseInputProps } from "../base-input/base-input";
import BaseInput from "../base-input/base-input";
import textareaTemplate from "./textarea.hbs?raw";

interface TextareaProps extends BaseInputProps {
    rows: number;
}

export default class Textarea extends BaseInput<TextareaProps>{
    static componentName = "Textarea";
    protected template = textareaTemplate;

}
