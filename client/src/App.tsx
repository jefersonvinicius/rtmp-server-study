import React, { useEffect, useRef, useState } from 'react';
import './App.css';

import { io, Socket } from 'socket.io-client';

function App() {
  const socket = useRef<Socket | null>(null);
  const videoElement = useRef<HTMLVideoElement | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);

  const [isStreaming, setIsStreaming] = useState(false);

  useEffect(() => {
    socket.current = io('http://localhost:3333');
    const _socket = socket.current;
    return () => {
      _socket.disconnect();
      if (mediaRecorder.current?.state === 'recording') mediaRecorder.current?.stop();
    };
  }, []);

  async function handleStartStreaming() {
    if (isStreaming) stopStream();
    else startStream();

    function stopStream() {
      mediaRecorder.current?.stop();
    }

    async function startStream() {
      const stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
      videoElement.current!.srcObject = stream;

      const streamAspectRatio = stream.getVideoTracks()[0].getSettings().aspectRatio ?? 16 / 9;
      const width = videoElement.current!.offsetHeight * streamAspectRatio;
      videoElement.current!.style.width = `${width}px`;

      mediaRecorder.current = new MediaRecorder(stream);
      mediaRecorder.current.ondataavailable = (event) => {
        socket.current?.emit('stream-buffer', { buffer: event.data });
      };
      mediaRecorder.current.onstop = () => {
        setIsStreaming(false);
        socket.current?.emit('finish-stream');
        stream.getTracks().forEach((track) => track.stop());
      };
      mediaRecorder.current.start(500);
      setIsStreaming(true);
    }
  }

  return (
    <div className="App">
      <div className="video-box">
        <video className="video-preview" ref={videoElement} autoPlay />
      </div>
      <div className="footer">
        <button onClick={handleStartStreaming} className="stream-controller">
          {isStreaming ? 'Parar' : 'Iniciar'}
        </button>
      </div>
    </div>
  );
}

export default App;
