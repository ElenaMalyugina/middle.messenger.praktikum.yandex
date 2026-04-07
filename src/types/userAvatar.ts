import { urls } from "../constants/urls";

export interface UserAvatar{
    avatar: string;
    profileName: string;
}

export class UserAvatarModel implements UserAvatar{
    avatar: string;
    profileName: string;

    constructor(data: UserAvatar){
        this.profileName=data.profileName;
        this.avatar = data.avatar ? `${data.avatar}` : urls.defaultProfileImg
    }
}
