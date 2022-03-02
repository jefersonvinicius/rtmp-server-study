import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080/api',
});

export type StreamInfo = {
  isLive: boolean;
  viewers: number;
  duration: number;
  bitrate: number;
  startTime: Date;
};

export default class NodeMediaAPI {
  static async getStream(streamId: string): Promise<StreamInfo | null> {
    const response = await instance.get('/streams/live/' + streamId);
    if (!response.data.startTime) return null;
    return apiEntryToApp(response.data);
  }
}

function apiEntryToApp(entry: any): StreamInfo {
  return {
    ...entry,
    startTime: new Date(entry.startTime),
  };
}

export class StreamNotFoundError extends Error {
  constructor(streamId: string) {
    super(`Stream with id ${streamId} not found!`);
  }
}
