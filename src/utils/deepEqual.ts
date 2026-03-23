export const deepEqual = (obj1: unknown, obj2: unknown): boolean => {
    // 1. Идентичные значения (включая примитивы)
    if (obj1 === obj2) return true;

    // 2. Проверка на null и тип объекта
    if (
        obj1 === null || obj2 === null ||
        typeof obj1 !== 'object' || typeof obj2 !== 'object'
    ) {
        return false;
    }

    // 3. Проверка на массивы (массивы — особый случай)
    if (Array.isArray(obj1) && Array.isArray(obj2)) {
        if (obj1.length !== obj2.length) return false;
        for (let i = 0; i < obj1.length; i++) {
        if (!deepEqual(obj1[i], obj2[i])) return false;
        }
        return true;
    }

    // 4. Если один массив, другой нет — не равны
    if (Array.isArray(obj1) || Array.isArray(obj2)) return false;

    // 5. Приведение к объектам с типизацией
    const o1 = obj1 as Record<string, unknown>;
    const o2 = obj2 as Record<string, unknown>;

    // 6. Получение ключей с учётом всех собственных перечисляемых свойств
    const keys1 = Object.keys(o1);
    const keys2 = Object.keys(o2);

    // 7. Сравнение количества ключей
    if (keys1.length !== keys2.length) return false;

    // 8. Рекурсивное сравнение значений
    for (const key of keys1) {
        // Проверка существования ключа во втором объекте
        if (!(key in o2)) return false;
        // Рекурсивное сравнение значений
        if (!deepEqual(o1[key], o2[key])) return false;
    }

    return true;
};
