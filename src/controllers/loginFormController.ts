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
        return this.login(data);
    }

    private async login(data: Login | null) {
        try {
            await this.loginApi.create(data)
                .then(resp=> {
                    if(resp==="OK"){
                        this.routing.go("/messenger");
                    }
                });
        }
        catch (error) {
            const parsedError = errorHandler(error);
            Store.setState("loginError", parsedError);
        }
    }

    public async logout(){
        try{
            await this.loginApi.delete()
                .then(resp =>{
                    if(resp==="OK"){
                        this.routing.go("/");
                    }
                })
        }
        catch(error){
            const parsedError = errorHandler(error);
            Store.setState("logoutError", parsedError);
        }
    }
}
