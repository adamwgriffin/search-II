"use client";

import { useSearchState } from "@/providers/SearchStateProvider";

export function OpenHouses() {
  const { searchState, setSearchState } = useSearchState();

  return (
    <fieldset className="flex gap-2">
      <input
        type="checkbox"
        name="openhouse"
        id="openhouse"
        checked={searchState.open_houses ?? false}
        onChange={() =>
          setSearchState({ open_houses: !searchState.open_houses })
        }
      />
      <label htmlFor="openhouse">Open Houses</label>
    </fieldset>
  );
}
