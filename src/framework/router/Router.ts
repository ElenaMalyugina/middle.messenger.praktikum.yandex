import type { BlockOwnProps } from "../Block";
import type Block from "../Block";
import Route from "./Route";

export default class Router {
    private static instance: Router;
    private routes: Route[] =[];
    private history: History;
    private _currentRoute: Route | null = null;
    private _rootQuery:string;

    private constructor(rootQuery: string) {
        this.history = window.history;
        this._rootQuery = rootQuery;
    }

    public static getInstance(rootQuery?: string): Router {
        if (!Router.instance) {
            if (!rootQuery) {
                throw new Error('rootQuery is required for first initialization');
            }
            Router.instance = new Router(rootQuery);
        }
        return Router.instance;
    }

    public use(pathname: string, block: { new(): Block }, blockProps: Partial<BlockOwnProps>) {
        const route = new Route(pathname, block, {rootQuery: this._rootQuery}, blockProps);

        this.routes.push(route);

        return this;
    }

    public start(): void{
        // Удаляем предыдущий обработчик, если он был
        window.removeEventListener('popstate', this._handlePopState);
        // Добавляем новый обработчик
        window.addEventListener('popstate', this._handlePopState);

        //предотвращаем перезагрузку на ссылках
        document.addEventListener('click', this.handleLinkClick);

        // Инициализируем текущий маршрут
        this._onRoute(window.location.pathname);
    }

    // обработчик для popstate
    private _handlePopState = (): void => {
        this._onRoute(window.location.pathname);
    }

    //обработчик ссылок
    private handleLinkClick = (e: MouseEvent): void => {
        const link = e.target as HTMLAnchorElement;
        if (link.tagName !== 'A' || !link.getAttribute('href')) return;

        e.preventDefault();
        const url = new URL(link.href, window.location.href);

        if (url.origin !== window.location.origin) {
            window.location.href = link.href;
            return;
        }

        switch (url.pathname) {
            case '/back':
                this.back();
                break;
            default:
                this.go(url.pathname);
        }
    }


    private _onRoute(pathname: string) {
        const route = this.getRoute(pathname);

        if (!route) {
            this.replace("/404");
            return;
        }

        if (this._currentRoute && this._currentRoute !== route) {
            this._currentRoute.leave();
        }

        this._currentRoute = route;
        route.createBlock();
    }

    public go(pathname: string) {
        this.history.pushState({}, '', pathname);
        this._onRoute(pathname);
    }

    public back() {
        this.history.back();
    }

    public forward() {
        this.history.forward();
    }

    //если не надо засорять историю какими-то роутингами
    public replace(pathname: string) {
        this.history.replaceState({}, '', pathname);
        this._onRoute(pathname);
    }


    public getRoute(pathname: string) {
        return this.routes.find(route => route.match(pathname));
    }
}
