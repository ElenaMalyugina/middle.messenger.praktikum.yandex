import ChangePasswordApi from "../api/changePasswordApi";
import Store from "../framework/store/Store";
import { errorHandler } from "../services/errorHandler";
import type { ChangePassword } from "../types/changePassword";
import BaseFormController from "./baseFormController";
import LoginController from "./loginFormController";

export default class ChangePasswordController extends BaseFormController<ChangePassword> {
    private changePasswordApi = new ChangePasswordApi();
    private loginController = new LoginController();

    protected formSend = (data: ChangePassword | null)=>{
        return this.changePassword(data);
    };

    private async changePassword(data: ChangePassword | null) {
        try {
            await this.changePasswordApi.update(data);
            this.loginController.logout();
        }
        catch (error: unknown) {
            const parsedError = errorHandler(error);
            Store.setState("changePasswordError", parsedError);
        }
    }
}
