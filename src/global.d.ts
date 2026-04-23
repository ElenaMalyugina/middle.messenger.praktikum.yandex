declare global {
  interface Window {
    intervals: number[];
    sockets: WebSocket[];
  }
}
export {};
