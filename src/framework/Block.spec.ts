import { deepEqual } from '../utils/deepEqual';
import * as Handlebars from 'handlebars';
import Block, { type BlockOwnProps } from './Block';
import { describe, expect, beforeEach, jest, test, afterEach } from '@jest/globals';


interface TestProps extends BlockOwnProps {
    text?: string;
}

class TestableBlock extends Block<Partial<TestProps>> {
    protected template = '';

    constructor(template: string, props: TestProps) {
        super(props);
        this.template = template;
    }

    getProps() {
        return this.props;
    }
}

jest.mock('handlebars', () => ({
    compile: jest.fn().mockImplementation(() => (context: unknown): string => {
        const props = context as Partial<TestProps>;

        return `<div>${props.text || ''}</div>`;
    })
}));

jest.mock('../utils/deepEqual', () => ({
    deepEqual: jest.fn((a: unknown, b: unknown): boolean => {
        if (typeof a !== 'object' && typeof b !== 'object') {
            return a === b;
        }
        return JSON.stringify(a) === JSON.stringify(b);
    })
}));

describe('Тесты для базового класса Block', () => {
    let mockTemplate: string;
    let mockProps: TestProps;
    let block: TestableBlock;

    beforeEach(() => {
        mockTemplate = '<div>{{text}}</div>';
        mockProps = { text: 'Test text' };

        block = new TestableBlock(mockTemplate, mockProps);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('Создается экземпляр класса Block', () => {
        expect(block).toBeTruthy();
        expect(block instanceof TestableBlock).toBe(true);
    });

    test('Создается экземпляр класса Block c props', () => {
        const props = block.getProps();
        expect(props).toHaveProperty('text');
    });

    test('props-значения применяются', () => {
        const props = block.getProps();
        expect(props.text).toBe('Test text');
    });

    test('element() после рендера возвращает HTML элемент', () => {
        const element = block.element();
        expect(element).toBeInstanceOf(HTMLElement);
    });

    test('setProps() должен запускать ререндер после обновления props', () => {
        const newProps = { text: 'New text' };
        const renderSpy = jest.spyOn(block as any, 'render');
        block.setProps(newProps);

        expect(renderSpy).toHaveBeenCalled();
    });

    test('setProps() НЕ должен запускать ререндер, если новые пропсы идентичны предыдущим', () => {
        const renderSpy = jest.spyOn(block as any, 'render');

        block.setProps({ text: 'Test text' });
        expect(renderSpy).not.toHaveBeenCalled();
    });

    test('isNeedRerender() должен возвращать true, если значения-примитивы равны', () => {
        const result = (block as any).isNeedRerender({ text: 'new' }, { text: 'old' });
        expect(result).toBe(true);
    });

    test('isNeedRerender() должен применять deepEqual, если сравниваемые значения- объекты', () => {
        (block as any).isNeedRerender(
            { obj: { a: 1 } },
            { obj: { a: 2 } }
        );
        expect(deepEqual).toHaveBeenCalled();
    });

    test('isNeedRerender() должен возвращать true, если значения-обекты, и они с точки зрения deepEqual НЕ равны', () => {
        const result = (block as any).isNeedRerender(
            { obj: { a: 1 } },
            { obj: { a: 2 } }
        );
        expect(result).toBe(true);
    });

    test('isNeedRerender() должен возвращать false, если значения-обекты, и они с точки зрения deepEqual равны', () => {
        const result = (block as any).isNeedRerender(
            { obj: { a: 2 } },
            { obj: { a: 2 } }
        );

        expect(result).toBe(false);
    });

    test('attachListeners() должен добавлять event listeners к элементу', () => {
        const mockElement = document.createElement('div');
        block['domElement'] = mockElement;
        block['events'] = { click: jest.fn() };

        const addEventListenerSpy = jest.spyOn(mockElement, 'addEventListener');
        (block as any).attachListeners();

        expect(addEventListenerSpy).toHaveBeenCalledWith('click', expect.any(Function));
    });

    test('removeListeners() должен удалять event listeners с элемента', () => {
        const mockElement = document.createElement('div');
        block['domElement'] = mockElement;
        block['events'] = { click: jest.fn() };

        const removeEventListenerSpy = jest.spyOn(mockElement, 'removeEventListener');
        (block as any).removeListeners();

        expect(removeEventListenerSpy).toHaveBeenCalledWith('click', expect.any(Function));
    });

    test('render() должен вызывать unmountComponent (в начале)', () => {
        const unmountSpy = jest.spyOn(block as any, 'unmountComponent');
        (block as any).render();

        expect(unmountSpy).toHaveBeenCalled();
    });

    test('render() должен вызывать mountComponent', () => {
        const mountSpy = jest.spyOn(block as any, 'mountComponent');

        (block as any).render();

        expect(mountSpy).toHaveBeenCalled();
    });

    test('compile() должен заполнять refs при наличии элемента с ref', () => {
        const template = '<div><span ref="testRef"></span></div>';
        const blockWithRef = new TestableBlock(template, {});

        jest.spyOn(Handlebars, 'compile').mockReturnValue(
            () => '<div><span ref="testRef"></span></div>'
        );

        (blockWithRef as any).compile();
        const refs = (blockWithRef as any).refs;

        expect(refs).toHaveProperty('testRef');
        expect(refs.testRef.tagName).toBe('SPAN');
    });

    test('compile() должен добавлять __children', () => {
        const mockEmbed1 = jest.fn((fragment: DocumentFragment) => {
            const element = childComponent1.element();
            if (element) fragment.appendChild(element);
        });

        const mockEmbed2 = jest.fn((fragment: DocumentFragment) => {
            const element = childComponent1.element();
            if (element) fragment.appendChild(element);
        });

        const childComponent1 = new TestableBlock(`<span id="child1">ChildContent</span>`, {});
        const childComponent2 = new TestableBlock(`<span id="child2">ChildContent</span>`, {});

        const props = {
            __children: [
                {
                    component: childComponent1,
                    embed: mockEmbed1
                },
                {
                    component: childComponent2,
                    embed: mockEmbed2
                }
            ]
        };

        const blockWithChildren = new TestableBlock(`<div id="parent"></div>`, props as any);
        (blockWithChildren as any).compile();
        const blockChildren = blockWithChildren.publicChildren;

        expect(blockWithChildren).toBeTruthy();
        expect(blockChildren).toHaveLength(2);

        expect(blockChildren[0]).toEqual(childComponent1);
        expect(blockChildren[1]).toEqual(childComponent2);
    });


    test('compile() должен вызывать embed() для дочернего компонента', () => {
        const mockEmbed = jest.fn((fragment: DocumentFragment) => {
            const element = childComponent.element();
            if (element) fragment.appendChild(element);
        });

        const childComponent = new TestableBlock(`<span id="child1">ChildContent</span>`, {});

        const props = {
            __children: [
                {
                    component: childComponent,
                    embed: mockEmbed
                },

            ]
        };

        const blockWithChildren = new TestableBlock(`<div id="parent"></div>`, props as any);
        (blockWithChildren as any).compile();

        expect(mockEmbed).toHaveBeenCalledTimes(1);
    });



    test('hide() должен запускать unmountComponent', () => {
        const mockParent = document.createElement('div');
        const mockElement = document.createElement('div');
        mockParent.appendChild(mockElement);

        block['domElement'] = mockElement;
        const unmountSpy = jest.spyOn(block as any, 'unmountComponent');

        block.hide();
        expect(unmountSpy).toHaveBeenCalled();
    });

     test('hide() должен удалять элемент из children DomElement', () => {
        const mockParent = document.createElement('div');
        const mockElement = document.createElement('div');
        mockParent.appendChild(mockElement);

        block['domElement'] = mockElement;

        block.hide();
        expect(mockParent.contains(mockElement)).toBe(false);
    });

    test('hide("clean") должен удалять элемент из DOM', () => {
        const mockParent = document.createElement('div');
        const mockElement = document.createElement('div');
        mockParent.appendChild(mockElement);

        block['domElement'] = mockElement;

        block.hide("clean");
        expect(block['domElement']).toBeNull();
    });

    test('renderDom() should append element to root', () => {
        const mockRoot = document.createElement('div');
        document.body.appendChild(mockRoot);

        jest.spyOn(document, 'querySelector').mockReturnValue(mockRoot);
        const appendChildSpy = jest.spyOn(mockRoot, 'appendChild');

        block.renderDom('#test-root');

        expect(appendChildSpy).toHaveBeenCalled();
        document.body.removeChild(mockRoot);
    });


});
