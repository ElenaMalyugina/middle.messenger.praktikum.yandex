import type { Indexed } from "../types/indexed";

export function merge<T = unknown>(lhs: Indexed<T>, rhs: Indexed<T>): Indexed<T> {
  const result: Indexed<T> = { ...lhs };

  for (const key in rhs) {
    if (Object.prototype.hasOwnProperty.call(rhs, key)) {
      const lhsValue = result[key];
      const rhsValue = rhs[key];

      // Если rhsValue — пустой объект, заменяем полностью
      if (
        typeof rhsValue === 'object' &&
        rhsValue !== null &&
        Object.keys(rhsValue).length === 0
      ) {
        result[key] = rhsValue;
      }
      // Проверяем, что оба значения — объекты (не null, не массив, не примитив)
      else if (
        lhsValue !== null &&
        rhsValue !== null &&
        typeof lhsValue === 'object' &&
        typeof rhsValue === 'object' &&
        !Array.isArray(lhsValue) &&
        !Array.isArray(rhsValue)
      ) {
        // Рекурсивно объединяем объекты
        result[key] = merge(lhsValue as Indexed<T>, rhsValue as Indexed<T>);
      } else {
        // В остальных случаях перезаписываем значение из rhs
        result[key] = rhsValue;
      }
    }
  }

  return result;
}
