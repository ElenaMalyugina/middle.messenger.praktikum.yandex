import Store from "../framework/store/Store";

export class UserService{
    static getCurrentUser: ()=> number | null = ()=>{
        return Store.getState().currentUser as number || null;
    }
}
