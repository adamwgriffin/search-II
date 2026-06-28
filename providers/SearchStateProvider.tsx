"use client";

import {
  ClearFiltersParams,
  getUpdatedQueryString,
  NonGeocodeParams,
  objectToQueryString,
  ParamDefaults
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

type NewLocationState =
  | { address: string }
  | { place_id: string; address_types: string };

type Searchtype = Exclude<SearchState["search_type"], undefined>;

type SearchStateContextValue = {
  /** The current searchState */
  searchState: Readonly<SearchState>;
  /**
   * Update params, like filters or map state, for the current location
   */
  setSearchState: (newParams: SearchStateUpdate) => void;
  /**
   * This is used for the inital search when a user chooses a new location
   */
  setNewLocation: (newLocationState: NewLocationState) => void;
  /** Changes the search type, like going from active to sold listings for
   * example. This will clear some of the current filters. */
  setSearchType: (newSearchType: Searchtype) => void;
  /**
   * Remove all filters, keeping location params intact
   */
  clearFilters: () => void;
};

const SearchStateContext = createContext<SearchStateContextValue | undefined>(
  undefined
);

/**
 * Strip invalid params, coerce values from strings into their expected types
 * (number, boolean, etc.) and convert URLSearchParams into an object type.
 */
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
      "place_id",
      "address_types"
    ]);
    Object.assign(params, newLocationState);
    router.push(`${pathname}?${objectToQueryString(params)}`);
  };

  const setSearchType = (newSearchType: Searchtype) => {
    const newParams = pick<SearchState>(searchParamsState, ClearFiltersParams);
    if (newSearchType !== ParamDefaults.search_type) {
      newParams.search_type = newSearchType;
    }
    router.push(`${pathname}?${objectToQueryString(newParams)}`);
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
        setSearchType,
        clearFilters
      }}
    >
      {children}
    </SearchStateContext.Provider>
  );
};

/** A context hook used to work with the listing search state */
export const useSearchState = (): SearchStateContextValue => {
  const context = useContext(SearchStateContext);
  if (context === undefined) {
    throw new Error("useSearchState must be used within a SearchStateProvider");
  }
  return context;
};
