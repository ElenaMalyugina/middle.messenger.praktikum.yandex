import "/src/components/profile/profile-avatar/profile-avatar.css";
import ProfileAvatarFormTemplate from "./profile-avatar-form.hbs?raw";
import Store from "../../../../framework/store/Store";
import ErrorMessage from "../../../../ui-units/error-message/error-message";
import Block, { type BlockOwnProps } from "../../../../framework/Block";
import { validate } from "../../../../services/validationService";
import ProfileController from "../../../../controllers/profileController";

interface ProfileAvatarProps extends BlockOwnProps{
    onChange: (file: File)=> void
}

export default class ProfileAvatarForm extends Block<ProfileAvatarProps>{
    static componentName = 'ProfileAvatarForm';
    protected template = ProfileAvatarFormTemplate;
    private profileController = new ProfileController();

    constructor(props: ProfileAvatarProps){
        super(props);
        this.props.onChange = this.submitForm;

        Store.subscribe(()=>{
            //если ошибка на бэке
            this.serverErrorHandler();
        })
    }

    protected submitForm = (file: File)=>{
        const validatorResult = validate(file, ["validatorFileImage","validatorFileMaxSize"]);

        if(!validatorResult.isValid){
            if(validatorResult.text){
                this.errorFormHandler(validatorResult.text);
            }
            return;
        }

        this.profileController.updateAvatar(file);
    }

    protected serverErrorHandler = ()=>{
        const serverError = Store.getState().avatarError as string;
        this.errorFormHandler(serverError);
    }

    protected errorFormHandler = (errorText: string)=>{
        const errorMessageBlock= this.children.find(el=> el instanceof ErrorMessage);
        if(!errorMessageBlock) return;
        errorMessageBlock.setProps({message: errorText});
    }

}
