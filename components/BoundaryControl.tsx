'use client'

import { useUpdateFilters } from '~/hooks/useUpdateFilters'

export type BoundaryControlProps = {
  loading?: boolean
}

export function BoundaryControl({ loading = false }: BoundaryControlProps) {
  const updateFilters = useUpdateFilters()

  return (
    <div className='absolute bottom-2 left-1/2 transform -translate-x-1/2'>
      <button
        disabled={loading}
        className='
        rounded-md shadow-sm p-2 shadow-gray-500 bg-background dark:bg-gray-600
        disabled:text-gray-400
        disabled:dark:text-gray-300
        '
        onClick={() => {
          updateFilters({ boundary_id: null })
        }}
      >
        Remove Boundary
      </button>
    </div>
  )
}
