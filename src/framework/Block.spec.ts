import * as Handlebars from 'handlebars';
import Block, { type BlockOwnProps } from './Block';
import { describe, expect, beforeEach, jest, test, afterEach } from '@jest/globals';


interface TestProps extends BlockOwnProps {
  text: string;
}

class TestableBlock extends Block<TestProps> {
  protected template = '';

  constructor(template: string, props: TestProps) {
    super(props);
    this.template = template;
  }

  getProps() {
    return this.props;
  }
}

// Мокируем зависимости ДО describe
jest.mock('handlebars', () => ({
  compile: jest.fn().mockImplementation(() => (context: unknown): string => {
    const props = context as Partial<TestProps>;
    return `<div>${props.text || ''}</div>`;
  })
}));

jest.mock('../utils/deepEqual', () => jest.fn((a: any, b: any) => {
  if (typeof a !== 'object' && typeof b !== 'object') {
    return a === b;
  }
  return JSON.stringify(a) === JSON.stringify(b);
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
    jest.clearAllMocks(); // Очищаем моки между тестами
  });

  test('should create instance', () => {
    expect(block).toBeTruthy();
    expect(block instanceof TestableBlock).toBe(true);
  });

  test('should create instance with props', () => {
    const props = block.getProps();
    expect(props).toHaveProperty('text');
    expect(typeof props.text).toBe('string');
    expect(props.text).toBe('Test text');
  });

  test('element() should return domElement after render', () => {
    // Убедимся, что domElement ещё не создан
    expect((block as any).domElement).toBeNull();

    const element = block.element();

    // Проверяем, что возвращён DOM‑элемент
    expect(element).toBeInstanceOf(Element);
    expect(element?.tagName).toBe('DIV');
    expect(element?.textContent).toBe('Test text');

    // Проверяем, что domElement инициализирован
    expect((block as any).domElement).not.toBeNull();
    expect((block as any).domElement).toBe(element);

    // Проверяем количество вызовов Handlebars.compile
    expect((Handlebars.compile as jest.Mock).mock.calls.length).toBe(1);
  });

  test('setProps() should trigger re-render when props change', () => {
    const oldElement = block.element();
    const oldContent = oldElement?.textContent || '';

    const newProps = { text: 'New text' };
    block.setProps(newProps);

    const newElement = block.element();
    const newContent = newElement?.textContent || '';

    expect(newElement).not.toBe(oldElement);
    expect(newContent).not.toBe(oldContent);
    expect(newContent).toBe('New text');
    expect(block.getProps().text).toBe('New text');
  });
});
