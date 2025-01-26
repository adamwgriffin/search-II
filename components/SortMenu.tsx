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
  const updateFilters = useUpdateFilters()

  function findSortTypeByLabel(sortLabel: string) {
    return SortTypeLabels.find(({ label }) => label === sortLabel)
  }

  function handleChange(value: string) {
    const sortTypeLabel = findSortTypeByLabel(value)
    if (!sortTypeLabel) return
    updateFilters({
      sort_by: sortTypeLabel.type,
      sort_direction: sortTypeLabel.direction
    })
  }

  return (
    <Select onValueChange={handleChange}>
      <SelectTrigger className='w-44 rounded-lg p-2 dark:bg-gray-500 dark:text-inherit'>
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
