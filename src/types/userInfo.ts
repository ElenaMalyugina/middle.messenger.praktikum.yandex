export interface UserInfo{
    email: string;
    login: string;
    first_name: string;
    second_name: string;
    display_name: string;
    phone: string;
}

export class UserInfoModel implements UserInfo {
    email: string;
    login: string;
    first_name: string;
    second_name: string;
    display_name: string;
    phone: string;

    constructor(data: UserInfo) {
        this.email = data.email;
        this.login = data.login;
        this.first_name = data.first_name;
        this.second_name = data.second_name;
        this.display_name = data.display_name || data.first_name;
        this.phone = data.phone;
    }
}
