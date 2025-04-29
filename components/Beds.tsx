'use client';

import { useSearchParamsState } from '~/providers/SearchParamsProvider';

const Values = [undefined, 1, 2, 3, 4, 5];

export function Beds() {
  const { searchParamsState, updateSearchParams } = useSearchParamsState();

  return (
    <fieldset className='flex gap-2'>
      <legend>Beds</legend>
      {Values.map((value) => (
        <label key={`beds-${value ?? 'any'}`} className='flex gap-1'>
          <input
            type='radio'
            name='beds'
            value={value}
            checked={searchParamsState.beds_min === value}
            onChange={() => updateSearchParams({ beds_min: value })}
          />
          {value ? `${value}+` : 'Any'}
        </label>
      ))}
    </fieldset>
  );
}
