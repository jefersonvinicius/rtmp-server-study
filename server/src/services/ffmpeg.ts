import { exec, execSync } from 'child_process';
import { MEDIA_SERVER_PORT, VIDEOS_PATH } from '../config/env';

export class FFMPEG {
  private streamsControls = new Map<string, boolean>();

  getVersion() {
    const result = execSync('ffmpeg -version').toString();
    if (!result.includes('ffmpeg version')) throw new Error('Unable get ffmpeg. Result was ' + result);
    return result.split('\n')[0].split(' ')[2];
  }

  startStream = (streamId: string) => {
    if (this.streamsControls.get(streamId)) {
      console.log(`Stream to ${streamId} already started!`);
      return;
    }

    const filePath = `${VIDEOS_PATH}/${streamId}.webm`;
    const command = `
    ffmpeg -re -i ${filePath} -c:v libx264 -preset veryfast -tune zerolatency -c:a aac -ar 44100 -f flv rtmp://localhost/live/${streamId}
    `;
    console.log(`Starting stream to ${streamId}`);
    this.streamsControls.set(streamId, true);
    exec(command, (error) => {
      console.log(`Stream ${streamId} finished `);
      this.streamsControls.set(streamId, false);
      if (error) {
        console.log(error);
        return;
      }
    });
  };
}

const ffmpeg = new FFMPEG();

export default ffmpeg;
