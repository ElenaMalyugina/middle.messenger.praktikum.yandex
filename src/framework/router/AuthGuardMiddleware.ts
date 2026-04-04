import AuthController from "../../controllers/authController";

export class authGuardMiddleware{
    private authController = new AuthController();

    public isAuth(){
        return this.authController.getUser();
    }
}
