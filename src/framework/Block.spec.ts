import { deepEqual } from '../utils/deepEqual';
import Block, { type BlockOwnProps } from './Block';
import { describe, expect, beforeEach, jest, test, afterEach } from '@jest/globals';


interface TestProps extends BlockOwnProps {
    text: string;
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

describe('Block class', () => {
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

    test('should create instance', () => {
        expect(block).toBeTruthy();
        expect(block instanceof TestableBlock).toBe(true);
    });

    test('should create instance with props', () => {
        const props = block.getProps();
        expect(props).toHaveProperty('text');
        expect(props.text).toBe('Test text');
    });

    test('element() should return domElement after render', () => {
        const element = block.element();
        expect(element).toBeInstanceOf(HTMLElement);
    });

    test('setProps() should trigger re-render when props change', () => {
        const newProps = { text: 'New text' };
        const renderSpy = jest.spyOn(block as any, 'render');
        block.setProps(newProps);

        expect(renderSpy).toHaveBeenCalled();
    });

    test('setProps() should not trigger re-render when props are the same', () => {
        const renderSpy = jest.spyOn(block as any, 'render');

        block.setProps({ text: 'Test text' });
        expect(renderSpy).not.toHaveBeenCalled();
    });

    test('isNeedRerender() should return true for different primitive values', () => {
        const result = (block as any).isNeedRerender({ text: 'new' }, { text: 'old' });
        expect(result).toBe(true);
    });

    test('isNeedRerender() should use deepEqual for different objects', () => {
        const result = (block as any).isNeedRerender(
            { obj: { a: 1 } },
            { obj: { a: 2 } }
        );

        expect(deepEqual).toHaveBeenCalled();
        expect(result).toBe(true);
    });

    test('isNeedRerender() should correct use deepEqual for same objects', () => {
        const result = (block as any).isNeedRerender(
            { obj: { a: 2 } },
            { obj: { a: 2 } }
        );

        expect(deepEqual).toHaveBeenCalled();
        expect(result).toBe(false);
    });

    test('attachListeners() should add event listeners', () => {
        const mockElement = document.createElement('div');
        block['domElement'] = mockElement;
        block['events'] = { click: jest.fn() };

        const addEventListenerSpy = jest.spyOn(mockElement, 'addEventListener');
        (block as any).attachListeners();

        expect(addEventListenerSpy).toHaveBeenCalledWith('click', expect.any(Function));
    });

    test('removeListeners() should remove event listeners', () => {
        const mockElement = document.createElement('div');
        block['domElement'] = mockElement;
        block['events'] = { click: jest.fn() };

        const removeEventListenerSpy = jest.spyOn(mockElement, 'removeEventListener');
        (block as any).removeListeners();

        expect(removeEventListenerSpy).toHaveBeenCalledWith('click', expect.any(Function));
    });

    test('render() should call unmountComponent and mountComponent', () => {
        const unmountSpy = jest.spyOn(block as any, 'unmountComponent');
        const mountSpy = jest.spyOn(block as any, 'mountComponent');

        (block as any).render();

        expect(unmountSpy).toHaveBeenCalled();
        expect(mountSpy).toHaveBeenCalled();
    });

    test('hide() should remove element from DOM', () => {
        const mockParent = document.createElement('div');
        const mockElement = document.createElement('div');
        mockParent.appendChild(mockElement);

        block['domElement'] = mockElement;

        const unmountSpy = jest.spyOn(block as any, 'unmountComponent');
        block.hide('clean');

        expect(unmountSpy).toHaveBeenCalled();
        expect(mockParent.contains(mockElement)).toBe(false);
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



  /*


  test('compile() should process template and children', () => {
    const mockChild = {
      component: new Block({}),
      embed: jest.fn(),
    };
    const propsWithChildren = {
      ...mockProps,
      __children: [mockChild],
      __refs: {},
    };

    class TestBlockWithChildren extends Block<any> {
      protected template = '<div><span ref="testRef"></span></div>';
      constructor(props: any) {
        super(props);
      }
    }

    const blockWithChildren = new TestBlockWithChildren(propsWithChildren);
    const compiledElement = (blockWithChildren as any).compile();

    expect(compiledElement).toBeInstanceOf(Element);
    expect(blockWithChildren.refs).toHaveProperty('testRef');
    expect(mockChild.embed).toHaveBeenCalled();
  });

  test('hide() should remove element from DOM', () => {
    const mockParent = document.createElement('div');
    const mockElement = document.createElement('div');
    mockParent.appendChild(mockElement);

    block['domElement'] = mockElement;

    const unmountSpy = jest.spyOn(block as any, 'unmountComponent');
    block.hide('clean');

    expect(unmountSpy).toHaveBeenCalled();
    expect(mockParent.contains(mockElement)).toBe(false);
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
  });*/


});
