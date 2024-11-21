import { useEffect, useState } from "react"

export default function Sender() {

    const [socket, setSocket] = useState<WebSocket | null>(null);

    useEffect(() => {
        const socket = new WebSocket("ws://localhost:8080");
        setSocket(socket);
        socket.onopen = () => {
            socket.send(JSON.stringify({ type: "identify-as-sender" }))
        }


    }, []);

    async function startSendingVideo() {

        if (!socket) return null;

        // create offer
        const pc = new RTCPeerConnection();

        
        //send the create offer to reciever side
        pc.onnegotiationneeded = async () => {
            const offer = await pc.createOffer();
            await pc.setLocalDescription(offer);
            socket?.send(JSON.stringify({ type: "createOffer", sdp: pc.localDescription }));
        }

        //
        pc.onicecandidate = (event) => {
            console.log(event);
            if (event.candidate) {
                socket.send(JSON.stringify({ type: 'iceCandidate', candidate: event.candidate }))
            }
        }

        socket.onmessage = async (event) => {
            const message = JSON.parse(event.data);

            if (message.type === 'createAnswer') {
                pc.setRemoteDescription(message.spd);
            }
            else if (message.type === 'iceCandidate') {
                pc.addIceCandidate(message.iceCandidate)
            }
        }
    }

    return (
        <div>
            <div>Sender side</div>
            <button type="button" onClick={startSendingVideo}>Send Video</button>
        </div>
    )
}