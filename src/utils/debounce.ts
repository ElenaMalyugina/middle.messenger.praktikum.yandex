export const debounce=<T extends (...args: unknown[]) => unknown>(
    func: T,
    delay: number
    ): (...args: Parameters<T>) => void =>{
    let timeoutId: number | null = null;

    return (...args: Parameters<T>): void =>{
        if (timeoutId !== null) {
            clearTimeout(timeoutId);
        }

            timeoutId = window.setTimeout(() => {
            func.apply(this, args);
            timeoutId = null;
        }, delay);
    };
}
