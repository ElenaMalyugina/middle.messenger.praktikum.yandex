import Handlebars from 'handlebars';
import type {HelperOptions} from 'handlebars';

/** Уникальный инкрементальный идентификатор для заглушки */
let uniqueId = 0;

function registerComponent(Component: any) {
  const dataAttribute = `data-component-hbs-id="${++uniqueId}"`;

  Handlebars.registerHelper(
    Component.componentName,
    function (this: unknown, { hash, data }: HelperOptions) {
      const component = new Component(hash);
      /** Если в свойствах компонента есть ссылка, сохраним её в свойство класса */
      if ('ref' in hash) {
        (data.root.__refs = data.root.__refs || {})[hash.ref] = component.element();
      }

      /** Примешиваем к свойствам компонента поле __children */
      (data.root.__children = data.root.__children || []).push({
        component,
        /** Функция для замены заглушки честным элементом */
        embed(node: DocumentFragment) {
          /** Ищем среди детей плейсхолдер и заменяем заглушку на реальный компонент */
          const placeholder = node.querySelector(`[${dataAttribute}]`);
          if (!placeholder) {
            throw new Error(`Can't find data-id for component ${Component.componentName}`);
          }

          const element = component.element();
          if (!element) {
            throw new Error('Component element is not created');
          }

          placeholder.replaceWith(element);
        }
      });



      return `<div ${dataAttribute}></div>`;
    }
  );
}

export {registerComponent};
