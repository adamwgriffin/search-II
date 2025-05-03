"use client";

import { useSearchState } from "~/providers/SearchStateProvider";

const Values = [undefined, 1, 2, 3, 4, 5];

export function Baths() {
  const { searchState, setSearchState } = useSearchState();

  return (
    <fieldset className="flex gap-2">
      <legend>Baths</legend>
      {Values.map((value) => (
        <label key={`baths-${value ?? "any"}`} className="flex gap-1">
          <input
            type="radio"
            name="baths"
            value={value}
            checked={searchState.baths_min === value}
            onChange={() => setSearchState({ baths_min: value })}
          />
          {value ? `${value}+` : "Any"}
        </label>
      ))}
    </fieldset>
  );
}
