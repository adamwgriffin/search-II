"use client";

import { ListingCard } from "@/components/ListingCard";
import { SearchResultsHeader } from "@/components/SearchResultsHeader";
import { SearchResultsLoading } from "@/components/SearchResultsLoading";
import { SearchResultsPagination } from "@/components/SearchResultsPagination";
import { useSearchResults } from "@/hooks/useSearchResults";

export function SearchResults() {
  const { data: results, isFetching, isError } = useSearchResults();

  if (isError) {
    return <p>Something went wrong</p>;
  }

  return (
    <div className="flex flex-col h-full">
      <SearchResultsHeader
        listingCount={results?.pagination?.numberAvailable}
        loading={isFetching}
      />
      <ul className="grow grid auto-rows-min grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] gap-3.5">
        {isFetching && <SearchResultsLoading />}
        {!isFetching &&
          results?.listings?.map((listing) => (
            <li key={listing._id}>
              <ListingCard listing={listing} />
            </li>
          ))}
      </ul>
      <div className="p-4">
        {results?.pagination && results.pagination.numberOfPages > 1 && (
          <SearchResultsPagination
            numberOfPages={results.pagination.numberOfPages}
            currentPage={results.pagination.page}
          />
        )}
      </div>
    </div>
  );
}
