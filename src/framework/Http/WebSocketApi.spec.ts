import { afterEach, beforeEach, describe, expect, it, jest } from "@jest/globals";
import WebSocketApi from "./WebSocketApi";

describe("WebSocketApi", () => {
    let ws: WebSocketApi;
    let onMessagesReceived: jest.Mock;

    const WS_STATES = {
        CONNECTING: 0,
        OPEN: 1,
        CLOSING: 2,
        CLOSED: 3,
    } as const;

    beforeEach(() => {
        // Сбросим синглтон перед каждым тестом
        (WebSocketApi as any).instance = undefined;

        onMessagesReceived = jest.fn();
        ws = WebSocketApi.getInstance(onMessagesReceived);

        // Мокаем глобальный WebSocket (простая заглушка)
        window.WebSocket = jest.fn().mockImplementation(() => ({
            readyState: WS_STATES.OPEN,
            send: jest.fn(),
            close: jest.fn(),
            addEventListener: jest.fn((_event, _cb, _opts) => {
                // можно имитировать событийные колбеки здесь
            }),
            removeEventListener: jest.fn(),
        })) as unknown as typeof WebSocket;
    });

    afterEach(() => {
        jest.clearAllMocks();
        // Сброс синглтона после тестов
        (WebSocketApi as any).instance = undefined;
    });

    it("getInstance возвращает singleton instance", () => {
        const ws2 = WebSocketApi.getInstance(onMessagesReceived);
        expect(ws).toBe(ws2);
    });

    it("start должен вызывать closeConnection если уже есть предыдущий сокет, а потом коннектиться", async () => {
        ws['socket'] = new WebSocket("ws://test");

        const closeSpy = jest.spyOn(ws, "closeConnection").mockResolvedValue(undefined);
        const startConnectSpy = jest.spyOn(ws as any, "startConnect").mockResolvedValue(undefined);

        await ws.start(1, 2);

        expect(closeSpy).toHaveBeenCalled();
        expect(startConnectSpy).toHaveBeenCalledWith(1, 2);
    });

    it("start должен вызывать connect, если сокета нет", async () => {
        ws['socket'] = null;
        const startConnectSpy = jest.spyOn(ws as any, "startConnect").mockResolvedValue(undefined);

        await ws.start(12, 34);
        expect(startConnectSpy).toHaveBeenCalledWith(12, 34);
    });

    it("closeConnection резолвится после закрытия сокета", async () => {
        ws['socket'] = null;
        const promise = ws.closeConnection();
        await expect(promise).resolves.toBeUndefined();
    });

    it("closeConnection запускает cleanup, если socket уже закрыт", async () => {
        const OriginalWebSocket = window.WebSocket as any;
        (window.WebSocket as any) = WS_STATES;

        const cleanupSpy = jest.spyOn(ws as any, "cleanupSocket").mockImplementation(()=>undefined);

        ws['socket'] = {
            readyState: WS_STATES.CLOSED,
            addEventListener: jest.fn(),
            close: jest.fn()
        } as any;

        await ws.closeConnection();

        expect(ws['socket']?.addEventListener).not.toHaveBeenCalled();
        expect(ws['socket']?.close).not.toHaveBeenCalled();
        expect(cleanupSpy).toHaveBeenCalled();
        window.WebSocket = OriginalWebSocket;
    });

    it("closeConnection закрывает сокет, если сокет открыт", async () => {
        const OriginalWebSocket = window.WebSocket as any;

        (window.WebSocket as any) = WS_STATES;

        const cleanupSpy = jest.spyOn(ws as any, "cleanupSocket").mockImplementation(()=>undefined);

        let onClose: (() => void) | undefined;
        const mockClose = jest.fn((_code?: number, _reason?: string) => {
            onClose?.();
        });

        ws["socket"] = {
            readyState: WS_STATES.OPEN,
            addEventListener: jest.fn((event, cb) => {
                if (event === "close") onClose = cb as () => void;
            }),
            close: mockClose,
        } as any;

        await ws.closeConnection(3333, "test reason");

        expect(mockClose).toHaveBeenCalledWith(3333, "test reason");
        expect(cleanupSpy).toHaveBeenCalled();

        window.WebSocket = OriginalWebSocket;
    });

    it("closeConnection закрывает сокет, если сокет в состоянии connecting", async () => {
        const OriginalWebSocket = window.WebSocket as any;
        (window.WebSocket as any) = WS_STATES;

        const cleanupSpy = jest.spyOn(ws as any, "cleanupSocket").mockImplementation(()=>undefined);
        const mockAddEventListener = jest.fn((event, cb: ()=>{}, _options: unknown) => {
            if (event === 'open') {
                cb();
            }
            if (event === 'close') {
                cb();
            }
        });
        const mockClose = jest.fn();

        ws['socket'] = {
            readyState: WebSocket.CONNECTING,
            addEventListener: mockAddEventListener,
            close: mockClose,
        } as any;

        await ws.closeConnection(9999, "waiting for open");
        expect(mockAddEventListener).toHaveBeenCalledWith('open', expect.any(Function), { once: true });
        expect(mockClose).toHaveBeenCalledWith(9999, "waiting for open");
        expect(cleanupSpy).toHaveBeenCalled();

        window.WebSocket = OriginalWebSocket;
    });

    it("closeConnection cleans up for closing state", async () => {
        const OriginalWebSocket = window.WebSocket as any;
        (window.WebSocket as any) = WS_STATES;

        const cleanupSpy = jest.spyOn(ws as any, "cleanupSocket").mockImplementation(()=>undefined);

        ws['socket'] = {
            readyState: WebSocket.CLOSING,
            addEventListener: jest.fn(),
            close: jest.fn()
        } as any;

        await ws.closeConnection();
        expect(cleanupSpy).toHaveBeenCalled();

        window.WebSocket = OriginalWebSocket;
    });

    it("getInstance sets onMessagesReceived handler", () => {
        const cb = jest.fn();
        WebSocketApi.getInstance(cb);
        expect((WebSocketApi as any).onMessagesReceived).toBe(cb);
    });

    /*

    it("should buffer messages if socket is not open", async () => {
        ws['socket'] = {
            readyState: WebSocket.CONNECTING,  // not OPEN
            send: jest.fn(),
            addEventListener: jest.fn(),
            close: jest.fn(),
        } as any;

        const req: SocketRequest = { content: "msg", type: "message" };
        ws['messageBuffer'] = [];
        if (typeof ws['sendMessage'] === "function") {
            ws['sendMessage'](req);
        } else {
            // прямой вызов по аналогии private с any
            (ws as any).sendMessage(req);
        }
        expect(ws['messageBuffer'].length).toBeGreaterThan(0);
        expect(ws['messageBuffer'][0]).toEqual(req);
    });

    it("should send buffered messages when socket is open", () => {
        const mockSend = jest.fn();
        ws['socket'] = {
            readyState: WebSocket.OPEN,
            send: mockSend,
            addEventListener: jest.fn(),
            close: jest.fn(),
        } as any;

        ws['messageBuffer'] = [
            { content: "1", type: "msg" },
            { content: "2", type: "msg" }
        ];
        if (typeof ws['flushMessageBuffer'] === "function") {
            ws['flushMessageBuffer']();
        } else {
            (ws as any).flushMessageBuffer();
        }
        expect(mockSend).toHaveBeenCalledTimes(2);
        expect(ws['messageBuffer']).toHaveLength(0);
    });

    it("should not fail flush when socket is not open", () => {
        ws['socket'] = {
            readyState: WebSocket.CONNECTING,
            send: jest.fn(), // will not be called
            addEventListener: jest.fn(),
            close: jest.fn(),
        } as any;
        ws['messageBuffer'] = [{ content: "a", type: "b" }];
        if (typeof ws['flushMessageBuffer'] === "function") {
            ws['flushMessageBuffer']();
        } else {
            (ws as any).flushMessageBuffer();
        }
        expect(ws['messageBuffer'].length).toBe(1);
    });

    it("should cleanup socket and clear interval", () => {
        ws['pingInterval'] = setInterval(() => {}, 1000) as unknown as number;
        ws['socket'] = {
            removeEventListener: jest.fn(),
            close: jest.fn(),
        } as any;

        if (typeof ws['cleanupSocket'] === "function") {
            ws['cleanupSocket']();
        } else {
            (ws as any).cleanupSocket();
        }
        expect(ws['pingInterval']).toBeNull();
        expect(ws['socket']).toBeNull();
    });

    it("should attempt reconnect only up to max attempts", async () => {
        ws['reconnectAttempts'] = ws['maxReconnectAttempts'];
        const connectSpy = jest.spyOn(ws as any, "connect").mockImplementation();
        if (typeof ws['tryReconnect'] === "function") {
            (ws as any).tryReconnect();
        } else {
            (ws as any).tryReconnect();
        }
        expect(connectSpy).not.toHaveBeenCalled();
    });*/
});
