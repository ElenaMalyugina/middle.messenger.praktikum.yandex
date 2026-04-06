import "/src/components/profile/profile-avatar/profile-avatar.css";
import ProfileAvatarFormTemplate from "./profile-avatar-form.hbs?raw";
import Form, { type FormProps } from "../../../../ui-units/form/form";
import AvatarController from "../../../../controllers/avatarController";
import Store from "../../../../framework/store/Store";
import ErrorMessage from "../../../../ui-units/error-message/error-message";
import Block, { type BlockOwnProps } from "../../../../framework/Block";
import Img from "../../../../ui-units/img/img";
import type { UserInfo } from "../../../../types/userInfo";
import { validate } from "../../../../services/validationService";

interface ProfileAvatarProps extends BlockOwnProps{
    onChange: (file: File)=> void
}

export default class ProfileAvatarForm extends Block<ProfileAvatarProps>{
    static componentName = 'ProfileAvatarForm';
    protected template = ProfileAvatarFormTemplate;
    private avatarController = new AvatarController();

    constructor(props: ProfileAvatarProps){
        super(props);
        this.props.onChange = this.submitForm
    }

    protected submitForm = (file: File)=>{
        const validatorResult = validate(file, ["validatorFileImage"]);

        if(!validatorResult.isValid){
            const errorMessageBlock= this.children.find(el=> el instanceof ErrorMessage);
            if(!errorMessageBlock) return;
            errorMessageBlock.setProps({message: validatorResult.text})
            return;
        }

        this.avatarController.changeAvatar(file);
    }

    protected componentDidMount(): void {
        Store.subscribe(()=>{
            const userData = Store.getState().userData as UserInfo;
            const imgBlock= this.children.find(el=> el instanceof Img);

            if(imgBlock && userData){
                imgBlock.setProps({src: userData.avatar})
            }

            //если ошибка на бэке
            const errorMessageBlock= this.children.find(el=> el instanceof ErrorMessage);
            if(!errorMessageBlock) return;
            const serverError = Store.getState();
            errorMessageBlock.setProps({message: serverError.avatarError as string })
        })
    }

}
