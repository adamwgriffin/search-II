'use client'

import { useSearchParams } from 'next/navigation'
import { useUpdateSearchParams } from '~/hooks/useUpdateSearchParams'

const Values = ['', '1', '2', '3', '4', '5']

export function Beds() {
  const searchParams = useSearchParams()
  const updateSearchParams = useUpdateSearchParams()

  return (
    <fieldset className='flex gap-2'>
      <legend>Beds</legend>
      {Values.map((value) => (
        <label key={`beds-${value || 'Any'}`} className='flex gap-1'>
          <input
            type='radio'
            name='beds'
            value={value}
            checked={(searchParams.get('beds_min') || '') === value}
            onChange={() => updateSearchParams({ beds_min: value })}
          />
          {value ? `${value}+` : 'Any'}
        </label>
      ))}
    </fieldset>
  )
}
