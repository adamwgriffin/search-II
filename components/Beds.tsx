'use client';

import { useSearchParamsState } from '~/providers/SearchParamsProvider';

const Values = ['', '1', '2', '3', '4', '5'];

export function Beds() {
  const { searchParamsState, updateSearchParams } = useSearchParamsState();

  const bedsMin = searchParamsState.beds_min
    ? String(searchParamsState.beds_min)
    : '';

  return (
    <fieldset className='flex gap-2'>
      <legend>Beds</legend>
      {Values.map((value) => (
        <label key={`beds-${value || 'Any'}`} className='flex gap-1'>
          <input
            type='radio'
            name='beds'
            value={value}
            checked={bedsMin === value}
            onChange={() => updateSearchParams({ beds_min: value })}
          />
          {value ? `${value}+` : 'Any'}
        </label>
      ))}
    </fieldset>
  );
}
