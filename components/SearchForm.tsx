'use client'

import { useState } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'

export function SearchForm() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [address, setAddress] = useState('')

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
      <form name='search-form' onSubmit={(e) => {
        e.preventDefault()
        updateFilters()
      }}>
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
            onClick={updateFilters}
          >
            Search
          </button>
        </fieldset>
      </form>
    </div>
  )
}
