'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode
} from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import {
  getUpdatedQueryString,
  objectToQueryString
} from '~/lib/listingSearchParams';
import { type URLParams } from '~/types';

type SearchParamsContextValue = {
  searchParamsState: Readonly<URLParams>;
  updateSearchParams: (newParams: URLParams) => void;
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
    Readonly<URLParams>
  >({});

  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries());
    // TODO: Parse and validate params with Zod. Parse will convert params to
    // proper types and validate will allow us to throw away invalid params.
    setSearchParamsState(params);
  }, [searchParams]);

  const updateSearchParams = (newParams: URLParams) => {
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
