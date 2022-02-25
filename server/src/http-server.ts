import express from 'express';
import cors from 'cors';
import routes from './routes';
import http from 'http';
import { Server } from 'socket.io';
import { WebSocketServerHandler } from './websocket-server';

const app = express();
const httpServer = http.createServer(app);
const webSocketServer = new Server(httpServer, {
  cors: {
    origin: '*',
  },
});
app.use(express.json());
app.use(cors());
app.use(routes);

const handler = new WebSocketServerHandler();
webSocketServer.on('connection', handler.connection);

export default httpServer;
