import { useQuery } from "@tanstack/react-query";
import { searchQueryOptions } from "~/lib/queries";
import { useSearchState } from "~/providers/SearchStateProvider";

export function useSearchResults() {
  const { searchState } = useSearchState();

  return useQuery(searchQueryOptions(searchState));
}
