import { queryString } from "../../utils/queryString";

export const METHODS = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
};

type Methods = typeof METHODS[keyof typeof METHODS];

type Options = {
    headers?: Record<string, string>;
    method?: Methods;
    data?: unknown;
    timeout?: number;
    responseType?: XMLHttpRequestResponseType;
}

export default class HTTPTransport {

    private resourceUrl: string;

    constructor(url: string){
        this.resourceUrl = 'https://ya-praktikum.tech/' + url;
    }

    get = (url: string, options: Options = {}) => {
        return this.request(
            url,
            {...options, method: METHODS.GET},
            options.timeout
        );
    };

    post = (url: string, options: Options = {}) => {
        return this.request(
            url,
            {...options, method: METHODS.POST},
            options.timeout
        );
    };

    put = (url: string, options: Options = {}) => {
        return this.request(
            url,
            {...options, method: METHODS.PUT},
                options.timeout
            );
        };

    delete = (url:string, options: Options = {}) => {
        return this.request(
            url,
            {...options, method: METHODS.DELETE},
            options.timeout
        );
    };

    private request = (url: string, options: Options = {}, timeout = 5000) => {
        const {headers = {}, method, data, responseType} = options;

        return new Promise((resolve, reject) => {
            if (!method) {
                reject(new Error('HTTP method is required'));
                return;
            }

            const xhr = new XMLHttpRequest();
            const isGet = method === METHODS.GET;

            xhr.open(
                method,
                isGet && data ? `${this.resourceUrl}${url}${queryString(data)}` :`${this.resourceUrl}${url}`,
            );

            if (responseType) {
                xhr.responseType = responseType;
            }

            Object.keys(headers).forEach(key => {
                xhr.setRequestHeader(key, headers[key]);
            });

            xhr.onload = function() {
                if (xhr.status >= 200 && xhr.status < 300) {
                    let response;

                    if (xhr.responseType) {
                        response = xhr.response;
                    } else {
                        try {
                            const contentType = xhr.getResponseHeader('Content-Type');

                            if (contentType && contentType.includes('application/json')) {
                                response = JSON.parse(xhr.responseText);
                            }
                            else {
                                response = xhr.responseText;
                            }
                        } catch (e) {
                            response = xhr.responseText;
                        }
                    }

                    resolve(response);
                } else {
                    reject({
                        status: xhr.status,
                        statusText: xhr.statusText,
                        response: xhr.responseText,
                        request: xhr
                    });
                }
            };

            xhr.onabort = () => reject({
                reason: 'Request aborted',
                request: xhr
            });

            xhr.onerror = () => reject({
                reason: 'Network error',
                request: xhr
            });

            xhr.timeout = timeout;

            xhr.ontimeout = () => reject({
                reason: 'Request timeout',
                timeout: timeout,
                request: xhr
            });

            if (isGet || !data) {
                xhr.send();
            } else if (data instanceof FormData) {
                xhr.send(data);
            } else if (typeof data === 'object') {
                if (!headers['Content-Type']) {
                    xhr.setRequestHeader('Content-Type', 'application/json');
                }
                xhr.send(JSON.stringify(data));
            } else {
                xhr.send(data as Document | XMLHttpRequestBodyInit | null | undefined);
            }
        });
    }
}
