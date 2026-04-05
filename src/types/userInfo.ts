export interface UserInfo{
    email: string;
    login: string;
    first_name: string;
    second_name: string;
    display_name: string;
    phone: string;
    avatar: string;
}

export class UserInfoModel implements UserInfo {
    email: string;
    login: string;
    first_name: string;
    second_name: string;
    display_name: string;
    phone: string;
    avatar: string;

    private defaultProfileImg = "/img/avatar-profile.png";
    private apiUrl = "https://ya-praktikum.tech/api/v2/resources";

    constructor(data: UserInfo) {
        this.email = data.email;
        this.login = data.login;
        this.first_name = data.first_name;
        this.second_name = data.second_name;
        this.display_name = data.display_name || data.first_name;
        this.phone = data.phone;
        this.avatar = `${this.apiUrl}${data.avatar}` || this.defaultProfileImg
    }
}
