'use client'

import { useSearchParams } from 'next/navigation'
import { useUpdateSearchParams } from '~/hooks/useUpdateSearchParams'

const Values = ['', '1', '2', '3', '4', '5']

export function Baths() {
  const searchParams = useSearchParams()
  const updateSearchParams = useUpdateSearchParams()

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
            onChange={() => updateSearchParams({ baths_min: value })}
          />
          {value ? `${value}+` : 'Any'}
        </label>
      ))}
    </fieldset>
  )
}
