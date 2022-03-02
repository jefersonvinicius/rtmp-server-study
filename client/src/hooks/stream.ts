import { useEffect, useState } from 'react';
import axios from 'axios';
export function useIsStreamVideoAvailable(streamId: string) {
  const [isVideoAvailable, setIsAvailable] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    setIsChecking(true);
    axios
      .get(`http://localhost:3333/lives/${streamId}.webm`)
      .then((response) => {
        console.log({ response });
        setIsAvailable(true);
      })
      .catch(() => {
        setIsAvailable(false);
      })
      .finally(() => {
        setIsChecking(false);
      });
  }, [streamId]);

  return { isVideoAvailable, isChecking };
}
