import { queryOptions } from '@tanstack/react-query';
import { fetchListings } from '~/lib/fetchListings';
import { type URLParams } from '~/types';

export function searchQueryOptions(searchParams: Readonly<URLParams>) {
  return queryOptions({
    // Run fetchListings() every time search params change
    queryKey: ['search', searchParams],
    queryFn: () => fetchListings(searchParams),
    staleTime: 1000 * 60
  });
}
