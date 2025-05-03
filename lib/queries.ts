import { queryOptions } from "@tanstack/react-query";
import { fetchListings } from "@/lib/fetchListings";
import { type SearchState } from "@/zod_schemas/searchStateSchema";

export function searchQueryOptions(searchState: SearchState) {
  return queryOptions({
    // Run fetchListings() every time search params change
    queryKey: ["search", searchState],
    queryFn: () => fetchListings(searchState),
    staleTime: 1000 * 60
  });
}
