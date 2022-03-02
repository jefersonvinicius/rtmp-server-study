import React, { useEffect, useRef } from 'react';
import flyjs from 'flv.js';

import './styles.css';

type Props = {
  url: string;
  controls?: boolean;
  onEnd?: () => void;
};

export default function FlvPlayer({ url, onEnd, controls }: Props) {
  const video = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const player = flyjs.createPlayer({
      type: 'flv',
      url,
    });
    player.attachMediaElement(video.current!);
    player.on(flyjs.Events.LOADING_COMPLETE, () => {
      console.log(`Player emit ${flyjs.Events.LOADING_COMPLETE} event`);
      onEnd?.();
    });
    player.load();
  }, [onEnd, url]);

  return (
    <div>
      {flyjs.isSupported() ? (
        <video className="flv-player" ref={video} autoPlay controls={controls} />
      ) : (
        <span>FLV Player not Supported</span>
      )}
    </div>
  );
}
