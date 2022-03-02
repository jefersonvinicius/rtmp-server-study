import React from 'react';
import FlvPlayer from 'components/FlvPlayer';
import { useParams } from 'react-router-dom';

import './styles.css';
import { useFetchStreamInfo } from 'services/node-media-api/hooks';
import { useIsStreamVideoAvailable } from 'hooks/stream';

export default function Watcher() {
  const { streamId } = useParams<{ streamId: string }>();
  const { stream, isFetching } = useFetchStreamInfo(streamId!);
  const { isVideoAvailable, isChecking } = useIsStreamVideoAvailable(streamId!);

  const isLoading = Boolean(isFetching || isChecking);

  return (
    <div>
      {isLoading ? (
        <span>Carregando...</span>
      ) : (
        <>
          {stream ? (
            <FlvPlayer url={`http://localhost:8080/live/${streamId}.flv`} />
          ) : isVideoAvailable ? (
            <div className="recorded-live-box">
              <video className="recorded-live-video" src={`http://localhost:3333/lives/${streamId}.webm`} controls />
              <span>Está live já foi finalizada! Assista a gravação acima.</span>
            </div>
          ) : (
            <span>Live não encontrada!</span>
          )}
        </>
      )}
    </div>
  );
}
