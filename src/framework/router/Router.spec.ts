import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import Router from './Router';
import Block from '../Block';
import Route from './Route';
//import Store from '../store/Store';

// Мок для History API
const mockHistory = {
    pushState: jest.fn(),
    replaceState: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
};

// Мок для Store
jest.mock('../store/Store', () => ({
    setState: jest.fn(),
}));

class MockBlock extends Block{
    protected template = "";
}

// Мок для Route
/*class MockRoute {
    constructor(
        public pathname: string,
        public block: any,
        public _blockProps: any,
        public options: any
    ) {}

    match(pathname: string) {
        return {
        matched: this.pathname === pathname,
        params: {},
        };
    }

    leave = jest.fn();
    createBlock = jest.fn();
}*/

describe('Router должен быть синглтоном', () => {
    beforeEach(() => {
        jest.clearAllMocks();

        // Сброс instance между тестами
        Object.defineProperty(Router, 'instance', {
            value: null,
            writable: true,
        });
    });

    it('должен создавать экземпляр при первом вызове getInstance', () => {
        const router = Router.getInstance('#app');
        expect(router).toBeInstanceOf(Router);
    });

    it('должен выбрасывать ошибку, если rootQuery не передан', () => {
        expect(() => Router.getInstance()).toThrow('Не определен корневой элемент');
    });

    it('должен возвращать один и тот же экземпляр при повторных вызовах', () => {
        const router1 = Router.getInstance('#app');
        const router2 = Router.getInstance('#app');
        expect(router1).toBe(router2);
    });
});

describe('Router - use method', () => {
    let router: Router;

    beforeEach(() => {
        router = Router.getInstance('#app');
        jest.clearAllMocks();

        Object.defineProperty(Router, 'instance', {
            value: null,
            writable: true,
        });
    });

    it('должен добавлять маршрут в массив routes', () => {
        router.use('/messenger', MockBlock, {});
        expect(router['routes'].length).toBe(1);
        expect(router['routes'][0]).toBeInstanceOf(Route);
    });

    it('должен принимать опции guards', () => {
        router.use('/messenger', MockBlock, {}, { guards: ['AuthGuard'] });
        const route = router['routes'][0];
        expect(route.guards).toEqual(['AuthGuard']);
    });

    it('должен возвращать this для цепочки вызовов', () => {
        const result = router.use('/test', MockBlock, {});
        expect(result).toBe(router);
    });
});

describe('Router - start method', () => {
    let router: Router;

    beforeEach(() => {
        router = Router.getInstance('#app');
        jest.clearAllMocks();
        window.history = mockHistory as any;
    });

    it('должен добавлять обработчики событий', () => {
        const addEventListenerSpy = jest.spyOn(window, 'addEventListener').mockImplementation(() => {});
        const addDocumentEventListenerSpy = jest.spyOn(document, 'addEventListener').mockImplementation(() => {});

        router.start();
        expect(addEventListenerSpy).toHaveBeenNthCalledWith(
            1,
            'popstate',
            expect.any(Function)
        );

        expect(addDocumentEventListenerSpy).toHaveBeenCalledWith(
            'click',
            expect.any(Function)
        );
    });

    it('handleLinkClick должен обрабатывать внутренние ссылки', () => {

    });
});





