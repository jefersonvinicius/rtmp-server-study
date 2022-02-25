import { HTTP_SERVER_PORT } from './config/env';
import mediaServer from './media-server';
import httpServer from './http-server';
import ffmpeg from './services/ffmpeg';

async function bootstrap() {
  console.log(`Using ffmpeg version ${ffmpeg.getVersion()}`);
  mediaServer.run();
  httpServer.listen(HTTP_SERVER_PORT, () => {
    console.log(`Serving at http://localhost:${HTTP_SERVER_PORT}`);
  });
}

bootstrap();
