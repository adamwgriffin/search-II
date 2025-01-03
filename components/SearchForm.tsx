'use client'

import { useState } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { useSearchResults } from '~/hooks/listingSearch'

export function SearchForm() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [address, setAddress] = useState('')

  const { isLoading } = useSearchResults()

  function updateSearchParams(params: Record<string, string>) {
    const updatedParams = new URLSearchParams(searchParams.toString())

    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        updatedParams.set(key, value)
      } else {
        updatedParams.delete(key)
      }
    })

    router.push(`${pathname}?${updatedParams.toString()}`)
  }

  function updateFilters() {
    const updatedFilters = { address: address }
    updateSearchParams(updatedFilters)
  }

  return (
    <div className='p-4'>
      <form name='search-form'>
        <fieldset className='flex gap-x-4'>
          <input
            type='text'
            name='address'
            value={address}
            autoComplete='off'
            onChange={(e) => setAddress(e.target.value)}
            className='p-2 rounded-md'
            data-1p-ignore
          />
          <button
            type='submit'
            form='search-form'
            value='Submit'
            onClick={updateFilters}
          >
            {isLoading ? 'Loading...' : 'Search'}
          </button>
        </fieldset>
      </form>
    </div>
  )
}
