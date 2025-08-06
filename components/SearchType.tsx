"use client";

import { SearchTypes } from "@/lib";
import { useSearchState } from "@/providers/SearchStateProvider";

export const SearchTypeLabels = {
  [SearchTypes.Buy]: "For Sale",
  [SearchTypes.Rent]: "For Rent",
  [SearchTypes.Sold]: "Sold"
};

export function SearchType() {
  const { searchState, setSearchState } = useSearchState();

  const searchType = searchState.search_type ?? SearchTypes.Buy;

  return (
    <fieldset>
      <legend className="sr-only">Search Type</legend>
      <div className="flex gap-2">
        {Object.values(SearchTypes).map((value) => {
          return (
            <label key={`search-type-${value}`} className="flex gap-1">
              <input
                type="radio"
                name={`search-type-${value}`}
                id={`search-type-${value}`}
                checked={value === searchType}
                value={value}
                onChange={() => setSearchState({ search_type: value })}
              />
              {SearchTypeLabels[value]}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
