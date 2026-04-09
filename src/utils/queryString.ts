export const queryString = (data: Record<string, unknown>): string => {
    if (typeof data !== 'object' || data === null) {
        throw new Error('Data must be a non-null object');
    }

    const keys = Object.keys(data);

    if (keys.length === 0) {
        return '';
    }

    const params: string[] = [];

    for (const key of keys) {
        const value = data[key];

        // Пропускаем undefined и null
        if (value === undefined || value === null) {
            continue;
        }

        let encodedValue: string;

        // Обработка разных типов значений
        if (Array.isArray(value)) {
        // Для массивов создаём несколько параметров с одинаковым ключом
        encodedValue = value
            .map(item => encodeURIComponent(String(item)))
            .join('&' + encodeURIComponent(key) + '=');
        } else if (typeof value === 'boolean') {
            encodedValue = String(value);
        } else if (typeof value === 'number') {
            encodedValue = isFinite(value) ? String(value) : '';
        } else {
            encodedValue = String(value);
        }

        params.push(`${encodeURIComponent(key)}=${encodeURIComponent(encodedValue)}`);
    }

    return '?' + params.join('&');
};
