import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals';
import Router from './Router';
import Block from '../Block';
import Route from './Route';

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

describe('Router - use method', () => {
    let router: Router;
    let mockGuard: { isAllowed: any; };

    beforeEach(() => {
        router = Router.getInstance('#app');
        jest.clearAllMocks();

        // Мокаем методы, вызывающие _onRoute
        jest.spyOn(router as any, 'replace').mockImplementation(() => {});
        jest.spyOn(router as any, 'updateStoreWithRoute').mockImplementation(() => {});

        // Мокаем guard для тестов
        mockGuard = {
            isAllowed: jest.fn<() => Promise<boolean>>().mockResolvedValue(true),
        };
        (router as any).guardsMap['TestGuard'] = mockGuard;
    });

    it('должен вызывать createBlock для подходящего маршрута без guards', async () => {
        const mockRoute = {
            match: jest.fn().mockReturnValue({ matched: true, params: {} }),
            _blockProps: {},
            guards: [], // Нет guards — нет риска рекурсии
            leave: jest.fn(),
            createBlock: jest.fn()
        };

        (router as any).routes = [mockRoute];

        await (router as any)._onRoute('/test');

        expect(mockRoute.createBlock).toHaveBeenCalledTimes(1);
        expect((router as any).updateStoreWithRoute).toHaveBeenCalledWith('/test', {});
        expect(mockRoute.leave).not.toHaveBeenCalled();
    });

    it('не должен вызывать createBlock, если guard блокирует доступ', async () => {
        mockGuard.isAllowed.mockResolvedValue(false); // Guard блокирует

        const mockRoute = {
            match: jest.fn().mockReturnValue({ matched: true, params: {} }),
            _blockProps: {},
            guards: ['TestGuard'], // Guard присутствует
            leave: jest.fn(),
            createBlock: jest.fn()
        };

        (router as any).routes = [mockRoute];

        await (router as any)._onRoute('/protected');

        expect(mockRoute.createBlock).not.toHaveBeenCalled();
        expect(mockGuard.isAllowed).toHaveBeenCalled();
    });

    it('не должен вызывать createBlock, если guard блокирует доступ', async () => {
        mockGuard.isAllowed.mockResolvedValue(false);

        const mockRoute = {
            match: jest.fn().mockReturnValue({ matched: true, params: {} }),
            _blockProps: {},
            guards: ['TestGuard'],
            leave: jest.fn(),
            createBlock: jest.fn()
        };

        (router as any).routes = [mockRoute];

        await (router as any)._onRoute('/protected');

        expect(mockRoute.createBlock).not.toHaveBeenCalled();
        expect(mockGuard.isAllowed).toHaveBeenCalled();
    });

    it('должен перенаправлять на 404 при отсутствии маршрута', async () => {
        (router as any).routes = [];
        await (router as any)._onRoute('/unknown');

        expect(router.replace).toHaveBeenCalledWith('/404');
    });

    it('должен вызывать leave для предыдущего маршрута при смене', async () => {
        const prevRoute = {
            match: jest.fn().mockReturnValue({ matched: false, params: {} }),
            leave: jest.fn(),
        };
        const newRoute = {
            match: jest.fn().mockReturnValue({ matched: true, params: {} }),
            _blockProps: {},
            guards: [],
            leave: jest.fn(),
            createBlock: jest.fn()
        };

        (router as any)._currentRoute = prevRoute;
        (router as any).routes = [newRoute];

        await (router as any)._onRoute('/new');

        expect(prevRoute.leave).toHaveBeenCalled();
        expect(newRoute.createBlock).toHaveBeenCalled();
    });
})


describe('Router - start method', () => {
    let router: Router;

    beforeEach(() => {
        router = Router.getInstance('#app');
        jest.clearAllMocks();
        window.history = mockHistory as any;
    });

    it('должен правильно настраивать обработчики событий', () => {
        const removeSpy = jest.spyOn(window, 'removeEventListener');
        const addSpy = jest.spyOn(window, 'addEventListener');
        const docAddSpy = jest.spyOn(document, 'addEventListener');

        router.start();

        // Проверка удаления старого обработчика
        expect(removeSpy).toHaveBeenCalledWith('popstate', expect.anything());
        // Уточняем, что это именно наш обработчик
        const firstCallArgs = removeSpy.mock.calls[0];
        expect(firstCallArgs[1]).toBe(router['_handlePopState']);

        // Проверка добавления нового обработчика
        expect(addSpy).toHaveBeenCalledWith('popstate', router['_handlePopState']);
        expect(docAddSpy).toHaveBeenCalledWith('click', router['handleLinkClick']);
    });

    it('handleLinkClick должен обрабатывать внутренние ссылки', async() => {
        const goSpy = jest.spyOn(router as any, 'go');

        router.start();

        const mockEvent = new MouseEvent('click', { bubbles: true });
        const link = document.createElement('a');
        link.href = '/test';

        Object.defineProperty(mockEvent, 'target', {
            value: link,
        });
        mockEvent.preventDefault = jest.fn();

        (router as any).handleLinkClick(mockEvent);

        expect(mockEvent.preventDefault).toHaveBeenCalled();
        expect(goSpy).toHaveBeenCalledWith('/test');
    });
});

describe('Router - navigation methods', () => {
    let router: Router;

    beforeEach(() => {
        Object.defineProperty(window, 'history', {
            value: mockHistory,
            writable: true,
            configurable: true
        });
        router = Router.getInstance('#app');
        (router as any).history = window.history;
        jest.clearAllMocks();
    });

    afterEach(() => {
        jest.restoreAllMocks(); // Очищаем моки после каждого теста
    });


    it('go должен вызывать pushState и _onRoute', async() => {
        const _onRouteSpy = jest.spyOn(router as any, '_onRoute');

        await router.go('/test');

        expect(mockHistory.pushState).toHaveBeenCalledTimes(1);
        expect(_onRouteSpy).toHaveBeenCalledWith('/test');
    });

    it('back должен вызывать history.back', () => {
        router.back();
        expect(mockHistory.back).toHaveBeenCalled();
    });

    it('forward должен вызывать history.forward', () => {
        router.forward();
        expect(mockHistory.forward).toHaveBeenCalled();
    });

    it('replace должен вызывать replaceState и _onRoute', () => {
        const _onRouteSpy = jest.spyOn(router as any, '_onRoute');
        router.replace('/test');
        expect(mockHistory.replaceState).toHaveBeenCalled();
        expect(_onRouteSpy).toHaveBeenCalledWith('/test');
    });
});















