'use client'

import { useUpdateFilters } from '~/hooks/useUpdateFilters'
import { useMap } from '@vis.gl/react-google-maps'
import type { URLParams } from '~/types'

export type BoundaryControlProps = {
  loading?: boolean
}

export function BoundaryControl({ loading = false }: BoundaryControlProps) {
  const updateFilters = useUpdateFilters()
  const map = useMap()

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
          if (!map) return
          const bounds = map?.getBounds()?.toUrlValue()
          if (!bounds) throw new Error('No bounds available for map')
          // Setting params to null removes them from the request and indicates
          // to the fetchListings function that we should search by bounds
          // instead of location
          const updatedFilters: URLParams = {
            bounds,
            address: null,
            place_id: null,
            boundary_id: null
          }
          updateFilters(updatedFilters)
        }}
      >
        Remove Boundary
      </button>
    </div>
  )
}
