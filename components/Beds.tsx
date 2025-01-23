'use client'

import { useSearchParams } from 'next/navigation'
import { useUpdateFilters } from '~/hooks/useUpdateFilters'

const Values = ['', '1', '2', '3', '4', '5']

export function Beds() {
  const searchParams = useSearchParams()
  const updateFilters = useUpdateFilters()

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
            onChange={() => updateFilters({ beds_min: value })}
          />
          {value ? `${value}+` : 'Any'}
        </label>
      ))}
    </fieldset>
  )
}
