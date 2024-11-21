import { Server } from "socket.io";
import Redis from "ioredis";

const publisher = new Redis({
  host: "redis-19190.c212.ap-south-1-1.ec2.redns.redis-cloud.com",
  port: 19190,
  username: "default",
  password: "default",
});
const subscriber = new Redis({
  host: "redis-19190.c212.ap-south-1-1.ec2.redns.redis-cloud.com",
  port: 19190,
  username: "default",
  password: "default",
});

class SocketService {
  private _io: Server;

  constructor() {
    console.log("Init socket server");
    this._io = new Server({
      cors: {
        allowedHeaders: ["*"],
        origin: ["*"],
      },
    });
    subscriber.subscribe("MESSAGES");
  }

  public initListeners() {
    const io = this.io;
    console.log("Initialise socket listeners");
    io.on("connect", (socket) => {
      console.log("New socket connected", socket.id);

      socket.on("event:message", async ({ message }: { message: string }) => {
        console.log("New message recieved ", message);
        await publisher.publish("MESSAGES", JSON.stringify({ message }));
      });
    });

    subscriber.on("message", (channel, message) => {
      if(channel === "MESSAGES") {
        io.emit("event:message", JSON.parse(message));
      }
    });
  }

  get io() {
    return this._io;
  }
}

export default SocketService;
