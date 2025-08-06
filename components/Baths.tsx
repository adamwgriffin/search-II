"use client";

import { InputButton } from "@/components/InputButton";
import { useSearchState } from "@/providers/SearchStateProvider";

const Values = [undefined, 1, 2, 3, 4, 5];

export function Baths() {
  const { searchState, setSearchState } = useSearchState();

  return (
    <fieldset className="flex gap-2">
      <legend className="form-heading">Baths</legend>
      {Values.map((value) => (
        <InputButton
          key={`baths-${value ?? "any"}`}
          type="radio"
          name="baths"
          value={value}
          checked={searchState.baths_min === value}
          onChange={() => setSearchState({ baths_min: value })}
          className="rounded-full min-w-14 px-0"
        >
          {value ? `${value}+` : "Any"}
        </InputButton>
      ))}
    </fieldset>
  );
}
