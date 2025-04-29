'use client';

import { useSearchParamsState } from '~/providers/SearchParamsProvider';

const Values = [undefined, 1, 2, 3, 4, 5];

export function Baths() {
  const { searchParamsState, updateSearchParams } = useSearchParamsState();

  return (
    <fieldset className='flex gap-2'>
      <legend>Baths</legend>
      {Values.map((value) => (
        <label key={`baths-${value ?? 'any'}`} className='flex gap-1'>
          <input
            type='radio'
            name='baths'
            value={value}
            checked={searchParamsState.baths_min === value}
            onChange={() => updateSearchParams({ baths_min: value })}
          />
          {value ? `${value}+` : 'Any'}
        </label>
      ))}
    </fieldset>
  );
}
