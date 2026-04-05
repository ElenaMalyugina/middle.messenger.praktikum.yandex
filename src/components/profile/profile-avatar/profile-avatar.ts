import "/src/components/profile/profile-avatar/profile-avatar.css";
import Block, { type BlockOwnProps } from "../../../framework/Block";
import ProfileAvatarTemplate from "./profile-avatar.hbs?raw";
import Store from "../../../framework/store/Store";
import type { UserInfo } from "../../../types/userInfo";
import { registerComponent } from "../../../framework/RegisterComponent";
import ProfileAvatarForm from "./profile-avatar-form/profie-avatar-form";

interface UserData{
    profileImg: string;
    profileName: string;
}

interface ProfileAvatarProps extends BlockOwnProps{
    isEditable: boolean;
    currentForm?: string;
    userData: UserData;
}

registerComponent(ProfileAvatarForm);

export default class ProfileAvatar extends Block<ProfileAvatarProps>{
    static componentName = 'ProfileAvatar';
    protected template = ProfileAvatarTemplate;
    private defaultProfileImg = "/img/avatar-profile.png";

    protected componentDidMount(): void {
        Store.subscribe(()=>{
            const userData = Store.getState();

            this.setProps(
                {
                    ...this.props,
                    userData:{
                        profileName: (userData.userData as UserInfo).display_name,
                        profileImg: this.defaultProfileImg
                    }
                }
            )
        })
    }
}
