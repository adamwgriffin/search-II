"use client";

import {
  ClearFiltersParams,
  getUpdatedQueryString,
  NonGeocodeParams,
  objectToQueryString
} from "@/lib/listingSearchParams";
import { parseAndStripInvalidProperties } from "@/zod_schemas";
import {
  type SearchState,
  type SearchStateUpdate,
  searchStateSchema
} from "@/zod_schemas/searchStateSchema";
import isEmpty from "lodash/isEmpty";
import omit from "lodash/omit";
import pick from "lodash/pick";
import {
  type ReadonlyURLSearchParams,
  usePathname,
  useRouter,
  useSearchParams
} from "next/navigation";
import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

type NewLocationState = Pick<SearchState, "address" | "place_id">;

type SearchStateContextValue = {
  searchState: Readonly<SearchState>;
  setSearchState: (newParams: SearchStateUpdate) => void;
  setNewLocation: (newLocationState: NewLocationState) => void;
  clearFilters: () => void;
};

const SearchStateContext = createContext<SearchStateContextValue | undefined>(
  undefined
);

function getStateFromParams(
  searchParams: ReadonlyURLSearchParams
): Readonly<SearchState> {
  const params = Object.fromEntries(searchParams.entries());
  const parsed = parseAndStripInvalidProperties(searchStateSchema, params);
  return Object.freeze(parsed);
}

export const SearchStateProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [searchParamsState, setSearchParamsState] = useState<
    Readonly<SearchState>
  >(getStateFromParams(searchParams));

  useEffect(() => {
    setSearchParamsState(getStateFromParams(searchParams));
  }, [searchParams]);

  const setSearchState = (newParams: SearchStateUpdate) => {
    const updatedQueryString = getUpdatedQueryString(
      searchParamsState,
      newParams
    );
    const url =
      updatedQueryString === ""
        ? pathname
        : `${pathname}?${updatedQueryString}`;
    router.push(url);
  };

  const setNewLocation = (newLocationState: NewLocationState) => {
    // Remove params for searching current location with a geospatial search.
    // Since we're now going to be geocoding a new location, we only want filter
    // params. Remove address/place_id for existing location so that we can
    // replace it with new state
    const params = omit(searchParamsState, [
      ...NonGeocodeParams,
      "address",
      "place_id"
    ]);
    Object.assign(params, newLocationState);
    router.push(`${pathname}?${objectToQueryString(params)}`);
  };

  const clearFilters = () => {
    const keptParams = pick(searchParamsState, ClearFiltersParams);
    const url = isEmpty(keptParams)
      ? pathname
      : `${pathname}?${objectToQueryString(keptParams)}`;
    router.push(url);
  };

  return (
    <SearchStateContext.Provider
      value={{
        searchState: searchParamsState,
        setSearchState,
        setNewLocation,
        clearFilters
      }}
    >
      {children}
    </SearchStateContext.Provider>
  );
};

export const useSearchState = (): SearchStateContextValue => {
  const context = useContext(SearchStateContext);
  if (context === undefined) {
    throw new Error("useSearchState must be used within a SearchStateProvider");
  }
  return context;
};
