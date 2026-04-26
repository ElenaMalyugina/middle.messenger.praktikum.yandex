import Route, { RouteProps, RouteMode } from './Route';
import type { BlockOwnProps } from '../Block';
import Block from '../Block';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';

class MockBlock extends Block<BlockOwnProps> {
    protected template="";
    public hide = jest.fn();
    public renderDom = jest.fn();
}

describe('Route class', () => {
    let route: Route;
    const mockBlockProps: Partial<BlockOwnProps> = {};
    const mockRouteProps: RouteProps = {
        rootQuery: '#app',
        mode: null,
        guards: ['auth'],
    };

    beforeEach(() => {
        route = new Route('/test', MockBlock, mockBlockProps, mockRouteProps);
    });

    describe('проверяем Constructor', () => {
        it('Должен создавать экземпляр с переданными props', () => {
        expect(route['_pathname']).toBe('/test');
        expect(route['_blockClass']).toBe(MockBlock);
        expect(route['_block']).toBeNull();
        expect(route['_props']).toEqual(mockRouteProps);
        expect(route['_blockProps']).toEqual(mockBlockProps);
        });
    });

    describe('тестирование для метода leave', () => {
        it('должно вызывать hide(), если блок существует', () => {
            route['_block'] = new MockBlock();
            route.leave();
            expect(route['_block'].hide).toHaveBeenCalled();
        });

        it('должно очищать блок и его props, если mode is "clean"', () => {
            const cleanRouteProps: RouteProps = {
                ...mockRouteProps,
                mode: 'clean' as RouteMode,
            };
            route = new Route('/test', MockBlock, mockBlockProps, cleanRouteProps);

            route['_block'] = new MockBlock();
            route.leave();

            expect(route['_block']).toBeNull();
            expect(route['_blockProps'].__children).toEqual([]);
            expect(route['_blockProps'].__refs).toEqual({});
        });

        it('не должен ничего делать, если _block=null', () => {
            route['_block'] = null;
            route.leave();
            expect(route['_block']).toBeNull();
        });
    });

    describe('match method', () => {
        it('Должен возвращать true для точного совпадения маршрута', () => {
            const result = route.match('/test');
            expect(result).toEqual({ matched: true, params: {} });
        });

        it('Должен поддерживать динамические параметры в роуте', () => {
            route = new Route('/user/:id', MockBlock, mockBlockProps, mockRouteProps);
            const result = route.match('/user/123');
            expect(result).toEqual({ matched: true, params: { id: '123' } });
        });
    });

    describe('Тест createBlock()', () => {
        it('createBlock() должен создавать новый блок, если блока нет', () => {
            route.createBlock();
            expect(route['_block'] instanceof MockBlock).toBe(true);
            expect(route['_block']?.renderDom).toHaveBeenCalledWith('#app');
        });

        it('createBlock должен рендерить уже существующий блок с помощью renderDom()', () => {
            route['_block'] = new MockBlock();
            jest.spyOn(route['_block'], 'renderDom');

            route.createBlock();
            expect(route['_block'].renderDom).toHaveBeenCalledWith('#app');
        });
    });

    describe('Тест guards getter', () => {
        it('guards getter должен вернуть корректныый массив guards', () => {
            expect(route.guards).toEqual(['auth']);

            route['_props'].guards.push('newGuard');
            expect(route.guards).toEqual(['auth', 'newGuard']);
        });
    });

});
