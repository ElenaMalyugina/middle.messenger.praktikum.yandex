import type Router from "../framework/router/Router";

export interface RouteGuard{
    isAllowed: (router: Router)=> Promise<boolean> | boolean;
}
