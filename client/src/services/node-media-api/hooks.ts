import { useQuery } from 'react-query';
import NodeMediaAPI from '.';

export function useFetchStreamInfo(streamId: string) {
  const query = useQuery(['stream', streamId], () => NodeMediaAPI.getStream(streamId), {
    enabled: !!streamId,
    refetchInterval: 2000,
    retryDelay: 1000,
    retry: 2,
  });
  return { stream: query.data, isFetching: query.isLoading };
}
