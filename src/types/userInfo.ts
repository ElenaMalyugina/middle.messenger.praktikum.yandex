import { urls } from "../constants/urls";

export interface UserInfo{
    id: number;
    email: string;
    login: string;
    first_name: string;
    second_name: string;
    display_name: string;
    phone: string;
    avatar: string;
}

export class UserInfoModel implements UserInfo {
    id: number;
    email: string;
    login: string;
    first_name: string;
    second_name: string;
    display_name: string;
    phone: string;
    avatar: string;

    constructor(data: UserInfo) {
        this.id = data.id;
        this.email = data.email;
        this.login = data.login;
        this.first_name = data.first_name;
        this.second_name = data.second_name;
        this.display_name = data.display_name || data.first_name;
        this.phone = data.phone;
        this.avatar = data.avatar ? `${urls.resourceUrl}${data.avatar}` : urls.defaultProfileImg
    }
}
