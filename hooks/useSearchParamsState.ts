import { useSearchParams } from 'next/navigation'
import { convertURLBoundsParamToLatLngBoundsLiteral } from '~/lib/polygon'

/**
 * A hook that handles computing state derived from the url search params
 */
export function useSearchParamsState() {
  const searchParams = useSearchParams()

  const params = Object.fromEntries(searchParams.entries())

  const bounds = params.bounds
    ? convertURLBoundsParamToLatLngBoundsLiteral(params.bounds)
    : null

  const zoom = params.zoom ? Number(params.zoom) : null

  const showMapBoundary = Boolean(
    (params.boundary_id && params.bounds) ||
      (!params.boundary_id && !params.bounds)
  )

  return { bounds, zoom, showMapBoundary }
}
