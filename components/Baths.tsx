'use client';

import { useSearchParamsState } from '~/providers/SearchParamsProvider';

const Values = ['', '1', '2', '3', '4', '5'];

export function Baths() {
  const { searchParamsState, updateSearchParams } = useSearchParamsState();

  const bathsMin = searchParamsState.baths_min
    ? String(searchParamsState.baths_min)
    : '';

  return (
    <fieldset className='flex gap-2'>
      <legend>Baths</legend>
      {Values.map((value) => (
        <label key={`baths-${value || 'Any'}`} className='flex gap-1'>
          <input
            type='radio'
            name='baths'
            value={value}
            checked={bathsMin === value}
            onChange={() => updateSearchParams({ baths_min: value })}
          />
          {value ? `${value}+` : 'Any'}
        </label>
      ))}
    </fieldset>
  );
}
