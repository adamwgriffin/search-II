'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useUpdatedFilters } from '~/hooks/useUpdateFilters'

export function SearchForm() {
  const searchParams = useSearchParams()
  const updateFilters = useUpdatedFilters()

  const [address, setAddress] = useState(searchParams.get('address') ?? '')

  return (
    <div className='p-4'>
      <form
        name='search-form'
        onSubmit={(e) => {
          e.preventDefault()
          updateFilters({ address })
        }}
      >
        <fieldset className='flex gap-x-4'>
          <input
            type='text'
            name='address'
            value={address}
            autoComplete='off'
            onChange={(e) => setAddress(e.target.value)}
            className='p-2 rounded-md w-72'
            data-1p-ignore
          />
          <button
            type='submit'
            form='search-form'
            value='Submit'
            onClick={() => updateFilters({ address })}
          >
            Search
          </button>
        </fieldset>
      </form>
    </div>
  )
}
