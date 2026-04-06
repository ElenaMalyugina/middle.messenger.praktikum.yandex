import "/src/components/profile/profile-avatar/profile-avatar.css";
import Block, { type BlockOwnProps } from "../../../framework/Block";
import ProfileAvatarTemplate from "./profile-avatar.hbs?raw";
import Store from "../../../framework/store/Store";
import { type UserInfo } from "../../../types/userInfo";
import { registerComponent } from "../../../framework/RegisterComponent";
import ProfileAvatarForm from "./profile-avatar-form/profile-avatar-form";
import type { UserAvatar } from "../../../types/userAvatar";

interface ProfileAvatarProps extends BlockOwnProps{
    isEditable: boolean;
    currentForm?: string;
    userData: UserAvatar;
}

registerComponent(ProfileAvatarForm);

export default class ProfileAvatar extends Block<ProfileAvatarProps>{
    static componentName = 'ProfileAvatar';
    protected template = ProfileAvatarTemplate;

    constructor(props: ProfileAvatarProps){
        super(props);
        Store.subscribe(()=>{
            this.updateData();
        })
    }

    protected updateData=()=>{
        const userData = Store.getState().userData;
        if(!userData) return;

        this.setProps(
            {
                userData:{
                    profileName: (userData as UserInfo).display_name,
                    avatar: (userData as UserInfo).avatar
                }
            }
        )
        console.log(Store)
    }
}
