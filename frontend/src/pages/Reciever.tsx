import { useEffect } from "react";

export default function Reciever() {

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:8080');

        let pc: RTCPeerConnection | null = null;

        socket.onopen = () => {
            socket.send(JSON.stringify({ type: "identify-as-reciever" }))
        }

        socket.onmessage = async (event) => {
            const message = JSON.parse(event.data);
            if (message.type === 'createOffer') {
                pc = new RTCPeerConnection();
                pc.setRemoteDescription(message.sdp);
                pc.onicecandidate = (event) => {
                    if (event.candidate) {
                        socket.send(JSON.stringify({ type: 'iceCandidate', candidate: event.candidate }))
                    }
                }

                const answer = await pc.createAnswer();
                await pc.setLocalDescription(answer);

                socket.send(JSON.stringify({ type: 'createAnswer', sdp: pc.localDescription }));
            } else if (message.type === 'iceCandidate') {
                pc?.addIceCandidate(message.iceCandidate)
            }
        }
    }, []);

    return (
        <div>
            Reciever End
        </div>
    )
}