import MessagesController from "../../../../../controllers/messagesController";
import type { BlockOwnProps } from "../../../../../framework/Block";
import Block from "../../../../../framework/Block";
import Store from "../../../../../framework/store/Store";
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
     private messagesController = new MessagesController();

    constructor(props: PopupFilesProps){
        super(props);
        this.props.onChange = this.submitForm;

        Store.subscribe(()=>{
            this.serverErrorFormHandler();
        })

    }

    protected submitForm = (file: File)=>{
        this.errorFormHandler("");
        const validatorResult = validate(file, ["validatorFileImage"]);

        if(!validatorResult.isValid){
            if(validatorResult.text){
                this.errorFormHandler(validatorResult.text);
            }
            return;
        }

        this.messagesController.uploadFile(file);
    }

    protected serverErrorFormHandler = ()=>{
        const error = Store.getState().MessageFileError as string;
        this.errorFormHandler(error);
    }

    protected errorFormHandler = (errorText: string)=>{
        const errorMessageBlock= this.children.find(el=> el instanceof ErrorMessage);
        if(!errorMessageBlock) return;
        errorMessageBlock.setProps({message: errorText});
    }

}
