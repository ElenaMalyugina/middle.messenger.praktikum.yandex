import LoginApi from "../api/loginApi";

export default class AuthController  {
    private loginApi: LoginApi = new LoginApi();

    public async getUser(){
        return await this.loginApi.request();
    }
}
