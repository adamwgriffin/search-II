'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode
} from 'react';
import {
  getUpdatedQueryString,
  objectToQueryString
} from '~/lib/listingSearchParams';
import {
  type SearchState,
  type SearchParamsUpdate,
  searchStateSchema
} from '~/zod_schemas/searchStateSchema';

type SearchParamsContextValue = {
  searchParamsState: Readonly<SearchState>;
  updateSearchParams: (newParams: SearchParamsUpdate) => void;
  clearSearchParamsFilters: () => void;
};

const SearchParamsContext = createContext<SearchParamsContextValue | undefined>(
  undefined
);

export const SearchParamsProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [searchParamsState, setSearchParamsState] = useState<
    Readonly<SearchState>
  >({});

  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries());
    // TODO: Handle schema errors after parsing. Remove any error keys and try
    // parsing again.
    const parsed = searchStateSchema.parse(params);
    setSearchParamsState(Object.freeze(parsed));
  }, [searchParams]);

  const updateSearchParams = (newParams: SearchParamsUpdate) => {
    const updatedQueryString = getUpdatedQueryString(
      searchParamsState,
      newParams
    );
    const url =
      updatedQueryString === ''
        ? pathname
        : `${pathname}?${updatedQueryString}`;
    router.push(url);
  };

  const clearSearchParamsFilters = () => {
    const address = searchParams.get('address');
    const url = address
      ? `${pathname}?${objectToQueryString({ address })}`
      : pathname;
    router.push(url);
  };

  return (
    <SearchParamsContext.Provider
      value={{
        searchParamsState,
        updateSearchParams,
        clearSearchParamsFilters
      }}
    >
      {children}
    </SearchParamsContext.Provider>
  );
};

export const useSearchParamsState = (): SearchParamsContextValue => {
  const context = useContext(SearchParamsContext);
  if (context === undefined) {
    throw new Error('useSearchState must be used within a SearchStateProvider');
  }
  return context;
};
