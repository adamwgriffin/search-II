"use client";

import {
  ClearFiltersParams,
  getUpdatedQueryString,
  objectToQueryString
} from "@/lib/listingSearchParams";
import { parseAndStripInvalidProperties } from "@/zod_schemas";
import {
  type SearchState,
  type SearchStateUpdate,
  searchStateSchema
} from "@/zod_schemas/searchStateSchema";
import isEmpty from "lodash/isEmpty";
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

type SearchStateContextValue = {
  searchState: Readonly<SearchState>;
  setSearchState: (newParams: SearchStateUpdate) => void;
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
