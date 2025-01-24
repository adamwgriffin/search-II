'use client'

import { useSearchParams } from 'next/navigation'
import type { ChangeEvent } from 'react'
import { useUpdateFilters } from '~/hooks/useUpdateFilters'
import { DefaultFilters } from '~/lib/listingSearchParams'
import type { SortDirection, SortType } from '~/types'

export type SortTypeLabels = {
  label: string
  type: SortType
  direction: SortDirection
}

export const SortTypeLabels: SortTypeLabels[] = [
  {
    label: 'Newest',
    type: 'listedDate',
    direction: 'desc'
  },
  {
    label: 'Price (Lo-Hi)',
    type: 'listPrice',
    direction: 'asc'
  },
  {
    label: 'Price (Hi-Lo)',
    type: 'listPrice',
    direction: 'desc'
  },
  {
    label: 'Beds',
    type: 'beds',
    direction: 'desc'
  },
  {
    label: 'Baths',
    type: 'baths',
    direction: 'desc'
  },
  {
    label: 'Square Feet',
    type: 'sqft',
    direction: 'desc'
  }
]

export function SortMenu() {
  const searchParams = useSearchParams()
  const updateFilters = useUpdateFilters()

  const sort_by = searchParams.get('sort_by') || DefaultFilters.sort_by
  const sort_direction =
    searchParams.get('sort_direction') || DefaultFilters.sort_direction

  function getCurrentSortType() {
    return SortTypeLabels.find(
      ({ type, direction }) => type === sort_by && direction === sort_direction
    )
  }

  function findSortTypeByLabel(sortLabel: string) {
    return SortTypeLabels.find(({ label }) => label === sortLabel)
  }

  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    const sortTypeLabel = findSortTypeByLabel(e.target.value)
    if (!sortTypeLabel) return
    updateFilters({
      sort_by: sortTypeLabel.type,
      sort_direction: sortTypeLabel.direction
    })
  }

  return (
    <select
      value={getCurrentSortType()?.label}
      onChange={handleChange}
      className='rounded-md p-1 dark:bg-gray-500 dark:text-inherit'
    >
      {SortTypeLabels.map(({ type, label, direction }) => (
        <option key={`${type}-${direction}`}>{label}</option>
      ))}
    </select>
  )
}
