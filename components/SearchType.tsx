"use client";

import { InputButton } from "@/components/InputButton";
import { SearchTypes } from "@/lib";
import { useSearchState } from "@/providers/SearchStateProvider";
import { ParamDefaults } from "@/lib/listingSearchParams";
import { type SearchStateUpdate } from "@/zod_schemas/searchStateSchema";

type SearchTypeButton = {
  value: (typeof SearchTypes)[keyof typeof SearchTypes];
  label: string;
  className?: string;
};

const searchTypeButtons: SearchTypeButton[] = [
  {
    value: SearchTypes.Buy,
    label: "For Sale",
    className: "rounded-l-md"
  },
  {
    value: SearchTypes.Rent,
    label: "For Rent"
  },
  {
    value: SearchTypes.Sold,
    label: "Sold",
    className: "rounded-r-md"
  }
];

export function SearchType() {
  const { searchState, setSearchState } = useSearchState();

  const searchType = searchState.search_type ?? ParamDefaults.search_type;

  return (
    <fieldset>
      <legend className="sr-only">Search Type</legend>
      <div className="grid grid-cols-3">
        {searchTypeButtons.map((s) => (
          <InputButton
            key={`search-type-${s.value}`}
            type="radio"
            name={`search-type-${s.value}`}
            id={`search-type-${s.value}`}
            checked={s.value === searchType}
            value={s.value}
            onChange={() => {
              const state: SearchStateUpdate = { search_type: s.value };
              if (s.value !== "sold") state.sold_in_last = null;
              setSearchState(state);
            }}
            className={s.className}
          >
            {s.label}
          </InputButton>
        ))}
      </div>
    </fieldset>
  );
}
