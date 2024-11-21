"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
let senderSocket = null;
let recieverSocket = null;
wss.on('connection', function connection(ws) {
    ws.on('error', console.error);
    ws.on('message', function message(data) {
        const message = JSON.parse(data);
        if (message.type === 'identify-as-sender') {
            senderSocket = ws;
            console.log("sender set");
        }
        else if (message.type === 'identify-as-reciever') {
            recieverSocket = ws;
            console.log("reciever set");
        }
        else if (message.type === 'createOffer') {
            if (ws !== senderSocket) {
                return;
            }
            console.log("create offer sent to reciever side");
            recieverSocket === null || recieverSocket === void 0 ? void 0 : recieverSocket.send(JSON.stringify({ type: 'createOffer', sdp: message.sdp }));
        }
        else if (message.type === 'createAnswer') {
            if (ws !== recieverSocket) {
                return;
            }
            console.log("create answer sent to sender side");
            senderSocket === null || senderSocket === void 0 ? void 0 : senderSocket.send(JSON.stringify({ type: "createAnswer", sdp: message.sdp }));
        }
    });
    ws.send('something');
});
