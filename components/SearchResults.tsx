"use client";

import { ErrorMessage } from "@/components/ErrorMessage";
import { ListingCard } from "@/components/ListingCard";
import { SearchResultsHeader } from "@/components/SearchResultsHeader";
import { SearchResultsLoading } from "@/components/SearchResultsLoading";
import { SearchResultsPagination } from "@/components/SearchResultsPagination";
import { useSearchResults } from "@/hooks/useSearchResults";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function SearchResults() {
  const router = useRouter();
  const { data: results, isFetching, isError } = useSearchResults();

  useEffect(() => {
    if (results?.listingDetail) {
      router.push(`/listing/${results.listingDetail.slug}`);
    }
  }, [results?.listingDetail, router]);

  if (isError) {
    return <ErrorMessage icon="😕" message="Sorry, something went wrong." />;
  }

  return (
    <div className="flex flex-col h-full">
      <SearchResultsHeader
        listingCount={results?.pagination?.numberAvailable}
        loading={isFetching}
      />
      <ul
        className="grow grid auto-rows-min grid-cols-[repeat(auto-fill,minmax(12.5rem,1fr))]
          gap-3.5"
      >
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
