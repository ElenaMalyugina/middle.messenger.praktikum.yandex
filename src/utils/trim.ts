export function trim(str: string, deleteSubstring: string = " "){
    if (deleteSubstring === null) {
        return str.trim();
    } else {
        // Создаём регулярное выражение для удаления заданных символов с начала и конца
        const regex = new RegExp(`^[${deleteSubstring}]+|[${deleteSubstring}]+$`, 'g');
        return str.replace(regex, '');
    }
}
