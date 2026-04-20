import { deepEqual } from "../../utils/deepEqual";
import type { BlockOwnProps } from "../Block";
import type Block from "../Block";
import { AllowedNoLoginMiddleware } from "./AllowedNoLogin";
import { AuthGuardMiddleware } from "./AuthGuardMiddleware";
import Route, { type RouteProps } from "./Route";

export default class Router {
    private static instance: Router;
    private routes: Route[] =[];
    private history: History;
    private _currentRoute: Route | null = null;
    private _rootQuery:string;
    private authGuardMiddleware =  new AuthGuardMiddleware();
    private allowedNoLoginMiddleware = new AllowedNoLoginMiddleware();

    private constructor(rootQuery: string) {
        this.history = window.history;
        this._rootQuery = rootQuery;
    }

    private guardsMap: Record<string, { isAllowed: (router: Router) => Promise<boolean> }> = {
        "AuthGuard": this.authGuardMiddleware,
        "AllowedNoLoginMiddleware": this.allowedNoLoginMiddleware
    };

    public static getInstance(rootQuery?: string): Router {
        if (!Router.instance) {
            if (!rootQuery) {
                throw new Error('Не определен корневой элемент');
            }
            Router.instance = new Router(rootQuery);
        }
        return Router.instance;
    }

    public use(pathname: string, block: { new(): Block }, blockProps: Partial<BlockOwnProps>, options?: Partial<RouteProps>) {
        const route = new Route(
            pathname,
            block,
            blockProps,
            {
                rootQuery: options?.rootQuery || this._rootQuery,
                mode: options?.mode || null,
                guards: options?.guards || []
            });

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
            window.open(link.href, '_blank');
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

    private async _onRoute(pathname: string) {
        // Ищем подходящий маршрут
        const matchedRoute = this.routes.find(route => {
            const matchResult = route.match(pathname);
            return matchResult.matched;
        });

        if (!matchedRoute) {
            this.replace("/404");
            return;
        }

        const matchResult = matchedRoute.match(pathname);

        // Обновляем пропсы блока, добавляя параметры маршрута
        const updatedBlockProps = {
            ...matchedRoute._blockProps,
            params: matchResult.params
        };

        // Применяем обновлённые пропсы
        matchedRoute._blockProps = updatedBlockProps;

        // Проверяем guards
        for (const guardName of matchedRoute.guards) {
            const guard = this.guardsMap[guardName];
            if (!guard) {
                console.error(`Unknown guard: ${guardName}`);
                continue;
            }

            const isAllowed = await guard.isAllowed(this);
            if (!isAllowed) return;
        }

        // Если текущий маршрут существует и отличается от нового
        if (this._currentRoute && this._currentRoute !== matchedRoute ) {
            this._currentRoute.leave();
        }

        this._currentRoute = matchedRoute;
        matchedRoute.createBlock();
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
