"use client";

import { useSearchState } from "@/providers/SearchStateProvider";

export function IncludePending() {
  const { searchState, setSearchState } = useSearchState();

  return (
    <fieldset className="flex gap-2">
      <input
        type="checkbox"
        name="openhouse"
        id="openhouse"
        checked={searchState.include_pending ?? false}
        onChange={() =>
          setSearchState({ include_pending: !searchState.include_pending })
        }
      />
      <label htmlFor="openhouse">Include Pending</label>
    </fieldset>
  );
}
