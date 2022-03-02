import { Socket } from 'socket.io';
import fs from 'fs';
import { VIDEOS_PATH } from './config/env';
import ffmpeg from './services/ffmpeg';

type SocketPlus = {
  ref: Socket;
  fileStream: fs.WriteStream;
};

export class WebSocketServerHandler {
  private sockets = new Map<string, SocketPlus>();

  connection = (socket: Socket) => {
    this.setSocketEvents(socket);
  };

  private setSocketEvents(socket: Socket) {
    console.log(`Socket ${socket.id} connected`);
    const videoPath = `${VIDEOS_PATH}/${socket.id}.webm`;
    let file: fs.WriteStream | null = null;

    socket.on('stream-buffer', ({ buffer }) => {
      if (!file) {
        file = fs.createWriteStream(videoPath);
        this.sockets.set(socket.id, { ref: socket, fileStream: file });
      } else if (this.sockets.has(socket.id)) {
        file = this.sockets.get(socket.id)!.fileStream;
        if (!file.writable) {
          file = fs.createWriteStream(videoPath, { flags: 'w' });
          this.sockets.set(socket.id, { ref: socket, fileStream: file });
        }
      }
      console.log('Receiving buffer of', socket.id);
      file.write(buffer, 'binary');
      ffmpeg.startStream(socket.id);
    });

    socket.on('finish-stream', () => {
      console.log(`Finishing stream ${socket.id}`);
      if (file?.writable) file.end();
    });

    socket.on('disconnect', () => {
      console.log(`Socket ${socket.id} disconnected`);
      file?.end();
      this.sockets.delete(socket.id);
    });
  }
}
