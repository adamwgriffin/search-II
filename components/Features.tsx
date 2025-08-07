import { useSearchState } from "@/providers/SearchStateProvider";
import { useCallback } from "react";

type FeatureFilters = Record<
  | "waterfront"
  | "view"
  | "fireplace"
  | "basement"
  | "garage"
  | "new_construction"
  | "pool"
  | "air_conditioning",
  string
>;

const featureFilters: FeatureFilters = Object.freeze({
  waterfront: "Waterfront",
  view: "Views",
  fireplace: "Fireplace",
  basement: "Basement",
  garage: "Garage",
  new_construction: "New Construction",
  pool: "Pool",
  air_conditioning: "Air Conditioning"
} as const);

export function Features() {
  const { searchState, setSearchState } = useSearchState();

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchState({ [e.target.name]: e.target.checked || null });
    },
    [setSearchState]
  );

  return (
    <fieldset>
      <legend className="form-heading">Home Features</legend>
      <ul className="grid grid-cols-[repeat(2,1fr)] gap-2">
        {Object.entries(featureFilters).map(([name, value]) => (
          <li key={name}>
            <label className="flex gap-2">
              <input
                type="checkbox"
                id={name}
                name={name}
                checked={Boolean(searchState[name as keyof FeatureFilters])}
                onChange={handleChange}
              />
              {value}
            </label>
          </li>
        ))}
      </ul>
    </fieldset>
  );
}
