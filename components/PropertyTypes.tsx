"use client";

import { InputButton } from "@/components/InputButton";
import { useSearchState } from "@/providers/SearchStateProvider";
import { type ChangeEvent } from "react";

export const propertyTypes = Object.freeze([
  {
    id: "single-family",
    label: "House"
  },
  {
    id: "condo",
    label: "Condo"
  },
  {
    id: "townhouse",
    label: "Townhouse"
  },
  {
    id: "manufactured",
    label: "Manufactured"
  },
  {
    id: "land",
    label: "Land"
  },
  {
    id: "multi-family",
    label: "Multi-Family"
  }
] as const);

export function PropertyTypes() {
  const { searchState, setSearchState } = useSearchState();

  const params = searchState.property_type?.split(",") ?? [];

  function handleChange(e: ChangeEvent<HTMLInputElement>, id: string) {
    const updatedPropertyTypes = e.target.checked
      ? params.concat(id)
      : params.filter((t) => t !== id);
    const property_type = updatedPropertyTypes.length
      ? updatedPropertyTypes.join(",")
      : null;
    setSearchState({ property_type });
  }

  return (
    <fieldset>
      <legend className="my-2">Home Type</legend>
      <div className="flex flex-wrap gap-2">
        {propertyTypes.map(({ label, id }) => (
          <InputButton
            key={`property-type-${label}-${id}`}
            type="checkbox"
            id={id}
            name={id}
            value={id}
            checked={params.includes(id)}
            onChange={(e) => handleChange(e, id)}
          >
            {label}
          </InputButton>
        ))}
      </div>
    </fieldset>
  );
}
