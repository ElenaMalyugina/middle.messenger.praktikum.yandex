import LoginApi from "../api/loginApi";
import Router from "../framework/router/Router";
import Store from "../framework/store/Store";
import { errorHandler } from "../services/errorHandler";
import type { Login } from "../types/login";
import BaseFormController from "./baseFormController";

export default class LoginController extends BaseFormController<Login> {
    private loginApi: LoginApi = new LoginApi();
    private routing = Router.getInstance("#app");

    public formSend = (data: Login | null)=>{
        Store.setState("isLoaderActive", true);
        return this.login(data);
    }

    private async login(data: Login | null) {
        try {
            const result = await this.loginApi.create(data);
            if(result==="OK"){
                this.routing.go("/messenger");
            }
        }
        catch (error) {
            const parsedError = errorHandler(error);
            Store.setState("loginError", parsedError);
        }
        finally{
            Store.setState("isLoaderActive", false);
        }
    }

    public async logout(){
        try{
            const result = await this.loginApi.delete();
            if(result==="OK"){
                Store.clearState();
                this.routing.replace("/");
            }
        }
        catch(error){
            const parsedError = errorHandler(error);
            Store.setState("logoutError", parsedError);
        }
    }
}
