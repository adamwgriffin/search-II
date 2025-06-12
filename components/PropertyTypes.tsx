"use client";

import { type ChangeEvent, Fragment } from "react";
import { useSearchState } from "@/providers/SearchStateProvider";

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
    <fieldset className="flex flex-wrap gap-2">
      <legend>Property Type</legend>
      {propertyTypes.map(({ label, id }) => (
        <Fragment key={`property-type-${label}-${id}`}>
          <input
            type="checkbox"
            id={id}
            name={id}
            value={id}
            checked={params.includes(id)}
            onChange={(e) => handleChange(e, id)}
          />
          <label htmlFor={id}>{label}</label>
        </Fragment>
      ))}
    </fieldset>
  );
}
