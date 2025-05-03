"use client";

import {
  type ReadonlyURLSearchParams,
  usePathname,
  useRouter,
  useSearchParams
} from "next/navigation";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode
} from "react";
import {
  getUpdatedQueryString,
  objectToQueryString
} from "@/lib/listingSearchParams";
import {
  type SearchState,
  type SearchStateUpdate,
  searchStateSchema
} from "@/zod_schemas/searchStateSchema";
import { parseAndStripInvalidProperties } from "@/zod_schemas";

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
    const address = searchParams.get("address");
    const url = address
      ? `${pathname}?${objectToQueryString({ address })}`
      : pathname;
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
