import AuthController from "../../controllers/authController";
import type { ServerError } from "../../types/serverError";

import type Router from "./Router";

export class authGuardMiddleware{
    private authController = new AuthController();

    public async isAuth(router: Router){
        try{
            await this.authController.getUser();
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
