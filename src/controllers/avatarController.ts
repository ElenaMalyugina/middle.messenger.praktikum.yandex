import AvatarApi from "../api/avatarApi";
import Store from "../framework/store/Store";
import { errorHandler } from "../services/errorHandler";
import { UserInfoModel, type UserInfo } from "../types/userInfo";

export default class AvatarController {
    private avatarApi: AvatarApi = new AvatarApi();

    public async changeAvatar(file: File){
        try{
            const formData = new FormData()
            formData.append('avatar', file);

            const userData = await this.avatarApi.update(formData);

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
