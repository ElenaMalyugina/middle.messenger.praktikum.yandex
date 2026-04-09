import AuthController from "../../controllers/authController";
import type { RouteGuard } from "../../types/guard";
import { UserInfoModel, type UserInfo } from "../../types/userInfo";
import Store from "../store/Store";
import type Router from "./Router";

export class AllowedNoLoginMiddleware implements RouteGuard{
    private authController = new AuthController();

    public async isAllowed(router: Router){
        try{
            const userRaw = await this.authController.getUser();
            const user = new UserInfoModel(userRaw as UserInfo)

            Store.setState("currentUser", user.id || null );
            router.replace("/messenger");
            return false;
        }
        catch(error){
            return true;
        }
    }
}
