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

    use(pathname: string, block: { new(): Block }, blockProps: unknown) {
        const route = new Route(pathname, block, {rootQuery: this._rootQuery}, blockProps);

        this.routes.push(route);

        return this;
    }

    start(): void{
        // Удаляем предыдущий обработчик, если он был
        window.removeEventListener('popstate', this._handlePopState);

        // Добавляем новый обработчик
        window.addEventListener('popstate', this._handlePopState);

        //предотвращаем перезагрузку на ссылках
        document.addEventListener('click', (e) => {
            const link = e.target as HTMLAnchorElement;
            if (link.tagName === 'A' && link.href) {
                e.preventDefault();
                const url = new URL(link.href, window.location.href);
                if (url.origin === window.location.origin) {
                    this.go(url.pathname);
                } else {
                    window.location.href = link.href;
                }
            }
        });

        // Инициализируем текущий маршрут
        this._onRoute(window.location.pathname);
    }

    // Приватный метод-обработчик для popstate
    private _handlePopState = (event: PopStateEvent): void => {
        this._onRoute(window.location.pathname);
    }


    private _onRoute(pathname: string) {
        const route = this.getRoute(pathname);

        if (!route) {
            return;
        }

        if (this._currentRoute && this._currentRoute !== route) {
            this._currentRoute.leave();
        }

        this._currentRoute = route;
        route.render();
    }

    go(pathname: string) {
        this.history.pushState({}, '', pathname);
        this._onRoute(pathname);
    }

    back() {
        this.history.back();
    }

    forward() {
        this.history.forward();
    }

    getRoute(pathname: string) {
        return this.routes.find(route => route.match(pathname));
    }
}
