'use client';

import { useSearchState } from '~/providers/SearchStateProvider';

const Values = [undefined, 1, 2, 3, 4, 5];

export function Beds() {
  const { searchState, setSearchState } = useSearchState();

  return (
    <fieldset className='flex gap-2'>
      <legend>Beds</legend>
      {Values.map((value) => (
        <label key={`beds-${value ?? 'any'}`} className='flex gap-1'>
          <input
            type='radio'
            name='beds'
            value={value}
            checked={searchState.beds_min === value}
            onChange={() => setSearchState({ beds_min: value })}
          />
          {value ? `${value}+` : 'Any'}
        </label>
      ))}
    </fieldset>
  );
}
