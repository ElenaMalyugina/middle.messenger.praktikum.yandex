import { urls } from '../../constants/urls';
import HTTPTransport, { METHODS } from './HTTPTransport'; // путь к вашему файлу
import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals';

// Мокируем зависимость queryString
jest.mock('../../utils/queryString', () => ({
    queryString: jest.fn((data: unknown) => {
        if (data && typeof data === 'object' && !Array.isArray(data)) {
        const params = new URLSearchParams(data as Record<string, string>);
        return `?${params.toString()}`;
        }
        return '';
    }),
}));

describe('HTTPTransport', () => {
    let http: HTTPTransport;
    let xhrMock: XMLHttpRequest;
    const mockUrl = 'api/test';

    beforeEach(() => {
        http = new HTTPTransport(mockUrl);

        // Создаём мок XMLHttpRequest
        xhrMock = {
            open: jest.fn(),
            send: jest.fn(),
            setRequestHeader: jest.fn(),
            getResponseHeader: jest.fn(),
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            abort: jest.fn(),
            status: 200,
            statusText: 'OK',
            response: '',
            responseText: '',
            responseType: '',
            timeout: 0,
            onreadystatechange: null,
            readyState: 4,
        } as unknown as XMLHttpRequest;

        // Заменяем глобальный XMLHttpRequest на мок
        jest.spyOn(window, 'XMLHttpRequest').mockImplementation(() => xhrMock);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('constructor', () => {
        it('должен создавать объект с правильным resourceUrl', () => {
            expect(http['resourceUrl']).toBe(`${urls.apiUrl}${mockUrl}`);
        });
    });

    describe('get method', () => {
        it('должен создавать GET-запрос с правильными параметрами и созданием query string', async () => {
            const data = { id: 1, name: 'test' };
            const expectedUrl = `${urls.apiUrl}${mockUrl}/endpoint?id=1&name=test`;

            // Настраиваем мок-ответы
            (xhrMock.getResponseHeader as jest.Mock).mockReturnValue('application/json');
            (xhrMock as any).responseText = JSON.stringify({ success: true });

            // Запускаем запрос
            const promise = http.get('/endpoint', { data });

            // Инициируем обработчик onload — имитируем успешный ответ сервера
            (xhrMock.onload as any).call(xhrMock);

            // Ждём результата
            const result = await promise;

            expect(xhrMock.open).toHaveBeenCalledWith(METHODS.GET, expectedUrl);
            expect(xhrMock.send).toHaveBeenCalled();
            expect(result).toEqual({ success: true });
        });

        it('должен отправлять GET-запрос, если данных для query string нет', async () => {
            const expectedUrl = `${urls.apiUrl}${mockUrl}/endpoint`;

            (xhrMock.getResponseHeader as jest.Mock).mockReturnValue('application/json');
            (xhrMock as any).responseText = JSON.stringify({ success: true });

            const promise = http.get('/endpoint');
            // Инициируем обработчик onload — имитируем успешный ответ сервера
            (xhrMock.onload as any).call(xhrMock);
            const result = await promise;

            expect(xhrMock.open).toHaveBeenCalledWith(METHODS.GET, expectedUrl);
            expect(xhrMock.send).toHaveBeenCalled();
            expect(result).toEqual({ success: true });
        });
    });

    describe('post method', () => {
        it('должен отправлять POST-запрос с данными в JSON-формате', async () => {
            const data = { name: 'John', age: 30 };
            const expectedUrl = `${urls.apiUrl}${mockUrl}/endpoint`;

            (xhrMock.getResponseHeader as jest.Mock).mockReturnValue('application/json');
            (xhrMock as any).responseText = JSON.stringify({ id: 1, ...data });

            const promise = http.post('/endpoint', { data });
            (xhrMock.onload as any).call(xhrMock);
            const result = await promise;

            expect(xhrMock.open).toHaveBeenCalledWith(METHODS.POST, expectedUrl);
            expect(xhrMock.setRequestHeader).toHaveBeenCalledWith('Content-Type', 'application/json');
            expect(xhrMock.send).toHaveBeenCalledWith(JSON.stringify(data));
            expect(result).toEqual({ id: 1, ...data });
        });

        it('должен отправлять POST-запрос с данными в FormData', async () => {
            const formData = new FormData();
            formData.append('file', new Blob(['test'], { type: 'text/plain' }));
            const expectedUrl = `${urls.apiUrl}${mockUrl}/endpoint`;

            (xhrMock.getResponseHeader as jest.Mock).mockReturnValue('application/json');
            (xhrMock as any).responseText = JSON.stringify({ success: true });

            const promise = http.post('/endpoint', { data: formData });
            (xhrMock.onload as any).call(xhrMock);
            const result = await promise;

            expect(xhrMock.open).toHaveBeenCalledWith(METHODS.POST, expectedUrl);
            expect(xhrMock.setRequestHeader).not.toHaveBeenCalledWith('Content-Type', 'application/json');
            expect(xhrMock.send).toHaveBeenCalledWith(formData);
            expect(result).toEqual({ success: true });
        });
    });

    describe('put method', () => {
        it('должен отправлять PUT-запрос', async () => {
            const data = { id: 1, updated: true };
            const expectedUrl = `${urls.apiUrl}${mockUrl}/endpoint`;

            (xhrMock.getResponseHeader as jest.Mock).mockReturnValue('application/json');
            (xhrMock as any).responseText = JSON.stringify({ ...data, modified: new Date().toISOString() });

            const promise = http.put('/endpoint', { data });
            (xhrMock.onload as any).call(xhrMock);
            const result = await promise;

            expect(xhrMock.open).toHaveBeenCalledWith(METHODS.PUT, expectedUrl);
            expect(xhrMock.setRequestHeader).toHaveBeenCalledWith('Content-Type', 'application/json');
            expect(xhrMock.send).toHaveBeenCalledWith(JSON.stringify(data));
            expect((result as any).updated).toBe(true);
        });
    });

    describe('delete method', () => {
        it('должен отправлять DELETE-запрос', async () => {
            const expectedUrl = `${urls.apiUrl}${mockUrl}/endpoint`;

            (xhrMock.getResponseHeader as jest.Mock).mockReturnValue('application/json');
            (xhrMock as any).responseText = JSON.stringify({ deleted: true, id: 1 });

            const promise = http.delete('/endpoint');
            (xhrMock.onload as any).call(xhrMock);
            const result = await promise;

            expect(xhrMock.open).toHaveBeenCalledWith(METHODS.DELETE, expectedUrl);
            expect(xhrMock.send).toHaveBeenCalled();
            expect(result).toEqual({ deleted: true, id: 1 });
        });
    });


    describe('request method (private)', () => {
        it('должен вызывать reject, если метод не указан', async () => {
            await expect(
                (http as any).request('/endpoint', {})
            ).rejects.toThrow('HTTP method is required');
        });

        it('должен поддерживать успешный JSON response', async () => {
            (xhrMock as any).status = 201;
            (xhrMock.getResponseHeader as jest.Mock).mockReturnValue('application/json');
            (xhrMock as any).responseText = JSON.stringify({ created: true });

            const promise = (http as any).request(
                '/endpoint',
                { method: METHODS.POST, data: { test: 'data' } }
            );
            (xhrMock.onload as any).call(xhrMock);
            const result = await promise;

            expect(result).toEqual({ created: true });
        });

        it('должен поддерживать успешный non-JSON response', async () => {
            (xhrMock as any).status = 200;
            (xhrMock.getResponseHeader as jest.Mock).mockReturnValue('text/plain');
            (xhrMock as any).responseText = 'Plain text response';

            const promise = (http as any).request(
                '/endpoint',
                { method: METHODS.GET }
            );
            (xhrMock.onload as any).call(xhrMock);
            const result = await promise;

            expect(result).toBe('Plain text response');
        });

        it('должен поддерживать error responses', async () => {
            (xhrMock as any).status = 404;
            (xhrMock as any).statusText = 'Not Found';
            (xhrMock as any).responseText = 'Resource not found';

            const promise = (http as any).request('/endpoint', { method: METHODS.GET });

            (xhrMock.onload as any).call(xhrMock);

            await expect(promise).rejects.toEqual({
                status: 404,
                statusText: 'Not Found',
                response: 'Resource not found',
                request: xhrMock,
            });
        });

       it('должен поддерживать timeout', async () => {
            const promise = (http as any).request('/endpoint', {
                method: METHODS.GET,
            }, 100);

            (xhrMock.ontimeout as any).call(xhrMock);

            await expect(promise).rejects.toEqual({
                reason: 'Request timeout',
                timeout: 100,
                request: xhrMock,
            });
        });

        it('должен поддерживать network error', async () => {
            const promise = (http as any).request('/endpoint', {
                method: METHODS.GET,
            });

            (xhrMock.onerror as any).call(xhrMock);
            await expect(promise).rejects.toEqual({
                reason: 'Network error',
                request: xhrMock,
            });
        });


        it('должен поддерживать прерывание запроса', async () => {
            const promise = (http as any).request('/endpoint', {
                method: METHODS.GET,
            });

            (xhrMock.onabort as any).call(xhrMock);
            await expect(promise).rejects.toEqual({
                reason: 'Request aborted',
                request: xhrMock,
            });
        });

        it('должен устанавливать withCredentials в true', () => {
            (http as any).request('/endpoint', { method: METHODS.GET });
            expect(xhrMock.withCredentials).toBe(true);
        });

        it('should set responseType when provided', () => {
            const responseType: XMLHttpRequestResponseType = 'blob';

            (http as any).request('/endpoint', {
                method: METHODS.GET,
                responseType
            });

            expect(xhrMock.responseType).toBe(responseType);
        });

        it('должен устанавливать кастомные headers', () => {
            const headers:Record<string, string> = {
                'Authorization': 'Bearer token',
                'X-Custom-Header': 'value'
            };

            (http as any).request('/endpoint', {
                method: METHODS.GET,
                headers
            });

            Object.keys(headers).forEach((key:string) => {
                expect(xhrMock.setRequestHeader).toHaveBeenCalledWith(key, headers[key]);
            });
        });


        it('should serialize object data to JSON and set Content-Type header', async () => {
            const data = { name: 'John', age: 30 };
            const serializedData = JSON.stringify(data);

            // Настраиваем мок для ответа сервера
            (xhrMock.getResponseHeader as jest.Mock).mockReturnValue('application/json');
            (xhrMock as any).responseText = JSON.stringify({ id: 1, ...data });

            // Запускаем запрос
            const promise = (http as any).request('/endpoint', {
                method: METHODS.POST,
                data
            });

            // Имитируем успешный ответ сервера
            (xhrMock.onload as any).call(xhrMock);

            // Ждём результата запроса
            const result = await promise;

            // Проверяем сериализацию данных
            expect(xhrMock.send).toHaveBeenCalledWith(serializedData);

            // Проверяем установку заголовка Content-Type
            expect(xhrMock.setRequestHeader).toHaveBeenCalledWith('Content-Type', 'application/json');

            // Дополнительно: проверяем, что результат соответствует ответу сервера
            expect(result).toEqual({ id: 1, name: 'John', age: 30 });
        });

        it('should not set Content-Type for FormData', async () => {
            const formData = new FormData();
            formData.append('file', new Blob(['test'], { type: 'text/plain' }));

            (xhrMock.getResponseHeader as jest.Mock).mockReturnValue('application/json');
            (xhrMock as any).responseText = JSON.stringify({ success: true });

            const promise =  (http as any).request('/endpoint', {
                method: METHODS.POST,
                data: formData
            });

            (xhrMock.onload as any).call(xhrMock);

            // Ждём результата запроса
            const result = await promise;

            expect(xhrMock.setRequestHeader).not.toHaveBeenCalledWith('Content-Type', 'application/json');
            expect(result).toBeTruthy;
        });


        it('should handle data serialization error', async () => {
            // Создаём объект с циклической ссылкой для вызова ошибки сериализации
            const circularData: any = { a: 1 };
            circularData.b = circularData;

            console.error = jest.fn();

            (xhrMock as any).status = 200;
            (xhrMock as any).responseText = '';

            const promise =  (http as any).request('/endpoint', {
                method: METHODS.POST,
                data: circularData
            });

            (xhrMock.onload as any).call(xhrMock);

            // Ждём результата запроса
            const result = await promise;

            expect(console.error).toHaveBeenCalledWith("Ошибка сериализации данных");
            expect(result).toBeTruthy;
        });
    });
});

