import { Manager } from "socket.io-client";

const manager = new Manager(process.env.NEXT_PUBLIC_SERVER_URL, {
  transports: ["websocket"],
  autoConnect: true,
  reconnection: true,
});

export { manager };
