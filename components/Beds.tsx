"use client";

import { InputButton } from "@/components/InputButton";
import { useSearchState } from "@/providers/SearchStateProvider";

const Values = [undefined, 1, 2, 3, 4, 5];

export function Beds() {
  const { searchState, setSearchState } = useSearchState();

  return (
    <fieldset className="flex gap-2">
      <legend className="form-heading">Beds</legend>
      {Values.map((value) => (
        <InputButton
          key={`beds-${value ?? "any"}`}
          type="radio"
          name="beds"
          value={value}
          checked={searchState.beds_min === value}
          onChange={() => setSearchState({ beds_min: value })}
          className="rounded-full min-w-14 px-0"
        >
          {value ? `${value}+` : "Any"}
        </InputButton>
      ))}
    </fieldset>
  );
}
