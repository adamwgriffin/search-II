import { Suspense } from "react";
import { SortMenu } from "@/components/SortMenu";

export type SearchResultsHeaderProps = {
  listingCount: number | undefined;
  loading?: boolean;
};

function listingsFoundMessage(listingCount: number | undefined) {
  if (!listingCount) return;
  return listingCount === 1
    ? "One Home"
    : `${listingCount.toLocaleString()} Homes`;
}

export function SearchResultsHeader({
  listingCount,
  loading = false
}: SearchResultsHeaderProps) {
  return (
    <div className="flex items-center justify-between pb-4">
      <div>
        {!loading && listingsFoundMessage(listingCount)}
        {loading && (
          <div className="animate-pulse w-20 h-5 rounded-md bg-gray-200 dark:bg-gray-700"></div>
        )}
      </div>
      <Suspense>
        <SortMenu />
      </Suspense>
    </div>
  );
}
