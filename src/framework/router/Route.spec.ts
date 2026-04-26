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

    describe('leave method', () => {
        it('should call hide on block when block exists', () => {
            route['_block'] = new MockBlock();
            route.leave();
            expect(route['_block'].hide).toHaveBeenCalledWith(null);
        });

        it('should clean block and props when mode is "clean"', () => {
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

        it('should do nothing when block is null', () => {
            route['_block'] = null;
            route.leave();
            expect(route['_block']).toBeNull();
        });
    });

    describe('match method', () => {
        it('should return true for exact match', () => {
            const result = route.match('/test');
            expect(result).toEqual({ matched: true, params: {} });
        });

        it('should handle dynamic parameters', () => {
            route = new Route('/user/:id', MockBlock, mockBlockProps, mockRouteProps);
            const result = route.match('/user/123');
            expect(result).toEqual({ matched: true, params: { id: '123' } });
        });

        // ... остальные тесты для match
    });

  /*describe('createBlock method', () => {
    // Тесты для createBlock
  });

  describe('guards getter', () => {
    // Тесты для геттера guards
  });

  describe('Edge cases', () => {
    // Граничные случаи
  });*/
});
