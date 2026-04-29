import type { BaseValidatedInputProps } from "../base-input/base-input";
import BaseInput from "../base-input/base-input";
import textareaTemplate from "./textarea.hbs?raw";

interface TextareaProps extends BaseValidatedInputProps {
    rows: number;
    submitEmit?: ()=>void;
}

export default class Textarea extends BaseInput<TextareaProps>{
    static componentName = "Textarea";
    protected template = textareaTemplate;

    constructor(props: TextareaProps){
        super(props);

        this.events = {
            ...this.events,
            keydown: (event?: Event)=>{
                if (!event || !(event instanceof KeyboardEvent)) return;
                if (event.ctrlKey && event.key === 'Enter') {
                    event.preventDefault();

                    if(this.props.submitEmit){
                        this.props.submitEmit();
                    }
                }
            }
        };

    }


}
