'use client'

import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useUpdateFilters } from '~/hooks/useUpdateFilters'

export function Baths() {
  const searchParams = useSearchParams()
  const updateFilters = useUpdateFilters()
  const [baths, setBaths] = useState(searchParams.get('baths_min') || '')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBaths(event.target.value)
    updateFilters({ baths_min: event.target.value })
  }

  return (
    <fieldset className='flex gap-2'>
      <legend>Baths</legend>
      <label className='flex gap-1'>
        <input
          type='radio'
          name='baths'
          value=''
          checked={baths === ''}
          onChange={handleChange}
        />
        Any
      </label>
      <label className='flex gap-1'>
        <input
          type='radio'
          name='baths'
          value='1'
          checked={baths === '1'}
          onChange={handleChange}
        />
        1
      </label>
      <label className='flex gap-1'>
        <input
          type='radio'
          name='baths'
          value='2'
          checked={baths === '2'}
          onChange={handleChange}
        />
        2
      </label>
      <label className='flex gap-1'>
        <input
          type='radio'
          name='baths'
          value='3'
          checked={baths === '3'}
          onChange={handleChange}
        />
        3
      </label>
      <label className='flex gap-1'>
        <input
          type='radio'
          name='baths'
          value='4'
          checked={baths === '4'}
          onChange={handleChange}
        />
        4
      </label>
      <label className='flex gap-1'>
        <input
          type='radio'
          name='baths'
          value='5'
          checked={baths === '5'}
          onChange={handleChange}
        />
        5
      </label>
    </fieldset>
  )
}
