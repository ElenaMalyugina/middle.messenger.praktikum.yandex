import type { BlockOwnProps } from "../../../../../framework/Block";
import Block from "../../../../../framework/Block";
import { validate } from "../../../../../services/validationService";
import ErrorMessage from "../../../../../ui-units/error-message/error-message";
import PopupFilesFormTemplate from "./popup-files-form.hbs?raw";

interface PopupFilesProps extends BlockOwnProps{
    onChange: (file: File)=>void;
    sendFileHandler: (file: File)=>void;
}

export default class PopupFilesForm extends Block<PopupFilesProps>{
    static componentName = 'PopupFilesForm';
    protected template = PopupFilesFormTemplate;

    constructor(props: PopupFilesProps){
        super(props);
        this.props.onChange = this.submitForm

    }

    protected submitForm = (file: File)=>{
        const validatorResult = validate(file, ["validatorFileImage"]);

        if(!validatorResult.isValid){
            if(validatorResult.text){
                this.errorFormHandler(validatorResult.text);
            }
            return;
        }
        //через пропс, так как контроллер должен быть один.
        //с синглтоном было бы слишком жесткое решение
        this.props.sendFileHandler(file);
    }

    protected errorFormHandler = (errorText: string)=>{
        const errorMessageBlock= this.children.find(el=> el instanceof ErrorMessage);
        if(!errorMessageBlock) return;
        errorMessageBlock.setProps({message: errorText});
    }
}
