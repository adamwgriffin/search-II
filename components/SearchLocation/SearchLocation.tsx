'use client';

import { useState } from 'react';
import SearchField from '~/components/SearchLocation/SearchField/SearchField';
import { useSearchNewLocation } from '~/hooks/useSearchNewLocation';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { getPlaceAutocompletePredictions } from '~/lib/getPlaceAutocompletePredictions';
import { useSearchParamsState } from '~/providers/SearchParamsProvider';

export function SearchLocation() {
  const { searchParamsState } = useSearchParamsState();
  // TODO: Move searchNewLocation into SearchParamsProvider
  const searchNewLocation = useSearchNewLocation();
  const [value, setValue] = useState(
    searchParamsState.address ? String(searchParamsState.address) : ''
  );
  const [searchString, setSearchString] = useState<string | null>(null);
  const { data, isError, error } = useQuery({
    queryKey: ['searchString', searchString],
    queryFn: () => getPlaceAutocompletePredictions(searchString),
    staleTime: 1000 * 60,
    placeholderData: keepPreviousData
  });

  if (isError) {
    console.error('Error fetching autocomplete:', error);
  }

  return (
    <form name='search-form' onSubmit={(e) => e.preventDefault()}>
      <SearchField
        value={value}
        options={data || []}
        onInput={(details) => setValue(details)}
        onGetPlaceAutocompletePredictions={(val) => setSearchString(val)}
        onClearPlaceAutocompletePredictions={() => setSearchString(null)}
        onSearchInitiated={() => searchNewLocation({ address: value })}
        onOptionSelected={(autocompletePrediction) => {
          searchNewLocation({ address: autocompletePrediction.description });
        }}
      />
    </form>
  );
}
