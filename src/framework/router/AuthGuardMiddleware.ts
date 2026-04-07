import AuthController from "../../controllers/authController";
import type { ServerError } from "../../types/serverError";
import { UserInfoModel, type UserInfo } from "../../types/userInfo";
import Store from "../store/Store";

import type Router from "./Router";

export class authGuardMiddleware{
    private authController = new AuthController();

    public async isAuth(router: Router){
        try{
            const userRaw = await this.authController.getUser();
            const user = new UserInfoModel(userRaw as UserInfo)

            Store.setState("currentUser", user.id || null );
            return true;
        }
        catch(error){
            if((error as ServerError).status >= 400){
                router.replace("/");
                return false
            }
        }
    }
}
