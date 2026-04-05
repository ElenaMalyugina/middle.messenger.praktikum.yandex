import LoginApi from "../api/loginApi";
import Store from "../framework/store/Store";
import { errorHandler } from "../services/errorHandler";
import { UserInfoModel, type UserInfo } from "../types/userInfo";
import BaseFormController from "./baseFormController";

export default class ProfileController extends BaseFormController<UserInfo> {

    private loginApi: LoginApi = new LoginApi();

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

    protected formSend= (data: UserInfo)=>{
        return new Promise(()=>{})
    };
}
