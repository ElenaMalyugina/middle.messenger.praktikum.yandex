export const replacePlaceholderToElement = (container: Element, placeholder: string, element: Element): void=> {
    // Проверка, что container — валидный DOM-узел
    if (!container || !(container instanceof Node)) {
        throw new Error('Контейнер не является DOM-узлом');
    }

    const range = document.createRange();
    const walker = document.createTreeWalker(
        container,
        NodeFilter.SHOW_TEXT,
        null
    );

    let node: Node | null;
    while ((node = walker.nextNode())) {
        const text = node.textContent || '';
        const index = text.indexOf(placeholder);

        if (index >= 0) {
            range.setStart(node, index);
            range.setEnd(node, index + placeholder.length);
            range.deleteContents();
            range.insertNode(element);
            break;
        }
    }
}
