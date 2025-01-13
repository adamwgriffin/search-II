'use client'

import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useUpdateFilters } from '~/hooks/useUpdateFilters'

export function Filters() {
  const searchParams = useSearchParams()
  const updateFilters = useUpdateFilters()
  const [beds, setBeds] = useState(searchParams.get('beds_min') || '')

  const handleBedroomsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBeds(event.target.value)
    updateFilters({ beds_min: event.target.value })
  }

  return (
    <form>
      <fieldset className='flex gap-2'>
        <legend>Beds</legend>
        <label className='flex gap-1'>
          <input
            type="radio"
            name="bedrooms"
            value=""
            checked={beds === ''}
            onChange={handleBedroomsChange}
          />
          Any
        </label>
        <label className='flex gap-1'>
          <input
            type="radio"
            name="bedrooms"
            value="1"
            checked={beds === '1'}
            onChange={handleBedroomsChange}
          />
          1
        </label>
        <label className='flex gap-1'>
          <input
            type="radio"
            name="bedrooms"
            value="2"
            checked={beds === '2'}
            onChange={handleBedroomsChange}
          />
          2
        </label>
        <label className='flex gap-1'>
          <input
            type="radio"
            name="bedrooms"
            value="3"
            checked={beds === '3'}
            onChange={handleBedroomsChange}
          />
          3
        </label>
        <label className='flex gap-1'>
          <input
            type="radio"
            name="bedrooms"
            value="4"
            checked={beds === '4'}
            onChange={handleBedroomsChange}
          />
          4
        </label>
        <label className='flex gap-1'>
          <input
            type="radio"
            name="bedrooms"
            value="5"
            checked={beds === '5'}
            onChange={handleBedroomsChange}
          />
          5
        </label>
      </fieldset>
    </form>
  )
}
