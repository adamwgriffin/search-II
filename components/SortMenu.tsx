'use client'

import { useUpdateFilters } from '~/hooks/useUpdateFilters'
import type { SortDirection, SortType } from '~/types'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '~/components/ui/select'
import { useSearchParams } from 'next/navigation'
import { ParamDefaults } from '~/lib/listingSearchParams'

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

  function findSortTypeByLabel(sortLabel: string) {
    return SortTypeLabels.find(({ label }) => label === sortLabel)
  }

  function getCurrentSortType() {
    return SortTypeLabels.find(
      ({ type, direction }) => type === sort_by && direction === sort_direction
    )
  }

  const sort_by = searchParams.get('sort_by') || ParamDefaults.sort_by
  const sort_direction =
    searchParams.get('sort_direction') || ParamDefaults.sort_direction

  function handleChange(value: string) {
    const sortTypeLabel = findSortTypeByLabel(value)
    if (!sortTypeLabel) return
    updateFilters({
      sort_by: sortTypeLabel.type,
      sort_direction: sortTypeLabel.direction
    })
  }

  return (
    <Select onValueChange={handleChange} value={getCurrentSortType()?.label}>
      <SelectTrigger className='w-44 rounded-lg p-2 dark:bg-gray-600 dark:text-inherit'>
        <SelectValue placeholder='Sort by' />
      </SelectTrigger>
      <SelectContent>
        {SortTypeLabels.map(({ type, label, direction }) => (
          <SelectItem key={`${type}-${direction}`} value={label}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
