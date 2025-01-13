'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useUpdateFilters } from '~/hooks/useUpdateFilters'
import { FaSearch } from "react-icons/fa";

export function SearchForm() {
  const searchParams = useSearchParams()
  const updateFilters = useUpdateFilters()

  const [address, setAddress] = useState(searchParams.get('address') ?? '')

  function setFiltersForNewSearch() {
    updateFilters({
      address,
      // Setting these to null will cause them to be removed from the url. When
      // bounds are absent we do a new search by fetching from the /geocode endpoint
      bounds_north: null,
      bounds_east: null,
      bounds_south: null,
      bounds_west: null,
      boundary_id: null,
      zoom: null
    })
  }

  return (
    <div className='p-4'>
      <form
        name='search-form'
        onSubmit={(e) => {
          e.preventDefault()
          setFiltersForNewSearch()
        }}
      >
        <fieldset className='flex gap-x-3'>
          <input
            type='text'
            name='address'
            value={address}
            autoComplete='off'
            onChange={(e) => setAddress(e.target.value)}
            className='p-2 rounded-md w-72 border border-gray-400'
            data-1p-ignore
            spellCheck='false'
          />
          <button
            type='submit'
            form='search-form'
            value='Submit'
            onClick={setFiltersForNewSearch}
          >
            <FaSearch size={26} />
          </button>
        </fieldset>
      </form>
    </div>
  )
}
