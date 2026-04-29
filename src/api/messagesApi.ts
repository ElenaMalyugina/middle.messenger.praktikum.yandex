import HTTPTransport from "../framework/Http/HTTPTransport";
import WebSocketApi, { type SocketRequest, type SocketResponse } from "../framework/Http/WebSocketApi";

export default class MessagesApi  {
    private transport: HTTPTransport;
    private socket: WebSocketApi;
    private originalOpenHandler: ()=>void;


    constructor(onMessageReceived: (response: SocketResponse) => void) {
        this.transport = new HTTPTransport('api/v2');
        this.socket = WebSocketApi.getInstance(onMessageReceived);

        this.originalOpenHandler = this.socket.openHandler;

    }

    async start(chatId: number, userId: number): Promise<void> {
        return new Promise((resolve, reject) => {
            this.socket.start(chatId, userId)
                .then(res=>{
                    this.originalOpenHandler();
                    resolve(res)
                })
                .catch((e)=>reject(e));
        });
    }

    getMessages = (count: number = 0)=>{
        return this.socket.send({
            content: count.toString(),
            type: 'get old'
        })
    }

    close(){
        this.socket.closeConnection();
    }

    send(data: SocketRequest){
        return this.socket.send(data)
    }

    sendFile<T = FormData>(file: T){
        return this.transport.post("/resources",
            { data: file }
        )
    }
}

