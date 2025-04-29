import { useQuery } from '@tanstack/react-query';
import { searchQueryOptions } from '~/lib/queries';
import { useSearchParamsState } from '~/providers/SearchParamsProvider';

export function useSearchResults() {
  const { searchParamsState } = useSearchParamsState();

  return useQuery(searchQueryOptions(searchParamsState));
}
