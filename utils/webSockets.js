import http from 'http'
import { Server } from "socket.io";
export let io, server

export var chatEvents;

const onConnection = (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
}
export const connectoToSocket = async (app) => {
  server = http.createServer(app);
  io = new Server(server, {
    cors: {
      origins: "*"
    }
  });

  io.on('connection', onConnection);
  global.io = io;
  server.listen(3005, () => {
    console.log('socket server listening on *:3000');
  });
}

