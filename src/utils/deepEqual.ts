export const deepEqual = (obj1:unknown, obj2:unknown)=> {
    // Проверка на идентичность
    if (obj1 === obj2) return true;

    // Если один из аргументов не объект или null
    if (typeof obj1 !== 'object' || obj1 === null ||
        typeof obj2 !== 'object' || obj2 === null) {
        return false;
    }

    // Получение ключей
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    // Сравнение количества ключей
    if (keys1.length !== keys2.length) return false;

    // Рекурсивное сравнение значений
    for (const key of keys1) {
        if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
        return false;
        }
    }

  return true;
}
