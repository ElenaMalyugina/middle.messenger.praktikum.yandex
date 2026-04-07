import LoginApi from "../api/loginApi";
import ProfileApi from "../api/profileApi";
import Store from "../framework/store/Store";
import { errorHandler } from "../services/errorHandler";
import { UserInfoModel, type UserInfo } from "../types/userInfo";
import BaseFormController from "./baseFormController";

export default class ProfileController extends BaseFormController<UserInfo> {
    private loginApi: LoginApi = new LoginApi();
    private profileApi = new ProfileApi();

    protected formSend = (data: UserInfo | null)=>{
        return this.updateUserInfo(data);
    };

    public async getUserInfo(){
        try{
            const userData = await this.loginApi.request();
            Store.setState("userData", new UserInfoModel(userData as UserInfo));
        }
        catch(error){
            const parsedError = errorHandler(error);
            Store.setState("userInfoError", parsedError);
        }
    }

    private async updateUserInfo(data: UserInfo | null) {
        try {
            const updatedUserData= await this.profileApi.update(data);
            Store.setState("userData", new UserInfoModel(updatedUserData as UserInfo));

        }
        catch (error: unknown) {
            const parsedError = errorHandler(error);
            Store.setState("profileInfoError", parsedError);
        }
    }

    public async updateAvatar(file: File){
        try{
            const formData = new FormData();
            formData.append('avatar', file);

            const userData = await this.profileApi.updateAvatar(formData);

            if((userData as UserInfo).avatar){
                Store.setState("userData", new UserInfoModel(userData as UserInfo))
            }
        }
        catch(error){
            const parsedError = errorHandler(error);
            Store.setState("avatarError", parsedError);
        }
    }


}
