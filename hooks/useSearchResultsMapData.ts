import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { useMemo } from 'react'
import { sortListingsByLatLng } from '~/lib/listingHelpers'
import {
  convertGeojsonCoordinatesToPolygonPaths,
  convertURLBoundsParamToLatLngBoundsLiteral,
  getAvailableBoundsFromSearchResults
} from '~/lib/polygon'
import { searchQueryOptions } from '~/lib/queries'

/**
 * A hook that handles computing derived data from the search results for the
 * ListingMap. It also handles memoization and placholder data for listings.
 */
export function useSearchResultsMapData() {
  const searchParams = useSearchParams()
  // Using keepPreviousData with placeholderData keeps the data from the last
  // request so that we can still show the current data while new data is being
  // fetched. We're doing this so that the map markers won't blink from being
  // re-rendered each time the map is moved and a new data fetch happens. See
  // details:
  // https://tanstack.com/query/latest/docs/framework/react/guides/paginated-queries
  const queryResult = useQuery({
    ...searchQueryOptions(searchParams),
    placeholderData: keepPreviousData
  })

  const results = queryResult.data

  const boundaryId = results?.boundary?._id

  // If the user changes the sort criteria, it will cause the markers to
  // re-render on the map, even if the have the exact same listing data, which
  // is yet another thing that makes the markers blink. It seems that
  // overlapping markers are placed with a different zIndex depending on what
  // order they were rendered in. Keeping the order stable by making sure they
  // always sort the same way fixes this.
  const listings = useMemo(() => {
    if (!results?.listings) return []
    return sortListingsByLatLng(results.listings)
  }, [results?.listings])

  const polygonPaths = useMemo(() => {
    const coordinates = results?.boundary?.geometry?.coordinates
    if (!coordinates) return
    return convertGeojsonCoordinatesToPolygonPaths(coordinates)
  }, [results?.boundary?.geometry?.coordinates])

  const searchResultsBounds = useMemo(() => {
    return getAvailableBoundsFromSearchResults(polygonPaths, results?.viewport)
  }, [polygonPaths, results?.viewport])

  const urlBoundsParam = useMemo(() => {
    const boundsParam = searchParams.get('bounds')
    if (boundsParam)
      return convertURLBoundsParamToLatLngBoundsLiteral(boundsParam)
  }, [searchParams])

  const showMapBoundary = useMemo(() => {
    return (
      Boolean(boundaryId && urlBoundsParam) ||
      Boolean(!boundaryId && !urlBoundsParam)
    )
  }, [boundaryId, urlBoundsParam])

  return {
    queryResult,
    boundaryId,
    listings,
    polygonPaths,
    searchResultsBounds,
    urlBoundsParam,
    showMapBoundary
  }
}
