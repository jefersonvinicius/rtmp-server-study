import NodeMediaServer from 'node-media-server';
import { MEDIA_SERVER_PORT } from './config/env';

const mediaServer = new NodeMediaServer({
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60,
  },
  http: {
    port: MEDIA_SERVER_PORT,
    allow_origin: '*',
    mediaroot: './media',
  },
});

mediaServer.on('prePublish', async (id, streamPath, args) => {
  console.log('[NodeEvent on prePublish]', `id=${id} StreamPath=${streamPath} args=${JSON.stringify(args)}`);
});

export default mediaServer;
