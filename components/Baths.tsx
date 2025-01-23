'use client'

import { useSearchParams } from 'next/navigation'
import { useUpdateFilters } from '~/hooks/useUpdateFilters'

const Values = ['', '1', '2', '3', '4', '5']

export function Baths() {
  const searchParams = useSearchParams()
  const updateFilters = useUpdateFilters()

  return (
    <fieldset className='flex gap-2'>
      <legend>Baths</legend>
      {Values.map((value) => (
        <label key={`baths-${value || 'Any'}`} className='flex gap-1'>
          <input
            type='radio'
            name='baths'
            value={value}
            checked={(searchParams.get('baths_min') || '') === value}
            onChange={() => updateFilters({ baths_min: value })}
          />
          {value ? `${value}+` : 'Any'}
        </label>
      ))}
    </fieldset>
  )
}
