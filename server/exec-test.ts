import { exec } from 'child_process';

exec(
  'ffmpeg -re -i ./videos/exemple.webm -c:v libx264 -preset veryfast -tune zerolatency -c:a aac -ar 44100 -f flv rtmp://localhost/live/STREAM_NAME',
  (error, stdout, stderr) => {
    console.log({ error });
    console.log({ stderr });
    console.log({ stdout });
  }
);
