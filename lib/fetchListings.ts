import omit from 'lodash/omit'
import type { ReadonlyURLSearchParams } from 'next/navigation'
import { http } from '~/lib/http'
import type { ListingSearchResponse, URLParams } from '~/types'

function removeNonListingServiceParams(params: URLParams) {
  return omit(params, 'bounds', 'boundary_id', 'zoom')
}

function removeNonGeospatialParams(params: URLParams) {
  return omit(params, 'address')
}

function convertBoundsParamToListingServiceBounds(boundsString: string) {
  const [bounds_south, bounds_west, bounds_north, bounds_east] =
    boundsString.split(',')
  return { bounds_south, bounds_west, bounds_north, bounds_east }
}

// TODO: Validate params with Zod instead
function paramsForGeospatialSearch(params: URLParams) {
  if (typeof params.bounds !== 'string') {
    throw new Error('Bounds not included in params')
  }
  const listingServiceBounds = convertBoundsParamToListingServiceBounds(
    params.bounds
  )
  const newParams = removeNonListingServiceParams(
    removeNonGeospatialParams(params)
  )
  return { ...newParams, ...listingServiceBounds }
}

async function getListings<T>(endpoint: string, params: URLParams) {
  return http<T>(`/api/listing/search/${endpoint}`, params)
}

async function searchNewLocation(params: URLParams) {
  return getListings<ListingSearchResponse>(
    'geocode',
    removeNonListingServiceParams(params)
  )
}

async function searchCurrentLocation(params: URLParams) {
  return getListings<ListingSearchResponse>(
    `boundary/${params.boundary_id}`,
    paramsForGeospatialSearch(params)
  )
}

async function searchBounds(params: URLParams) {
  return getListings<ListingSearchResponse>(
    'bounds',
    paramsForGeospatialSearch(params)
  )
}

// TODO: Do we actually need to await these functions?
export async function fetchListings(searchParams: ReadonlyURLSearchParams) {
  if (searchParams.size === 0) return {}
  const params = Object.fromEntries(searchParams.entries())
  const location = params.place_id || params.address
  const { bounds, boundary_id } = params
  // The user entered a new search in the search field
  if (location && !bounds) {
    return await searchNewLocation(params)
  }
  // We have previously performed a new search and now we are performing subsequent
  // searches on the same location with different criteria
  if (location && boundary_id) {
    return await searchCurrentLocation(params)
  }
  // The user removed the location boundary so we are just performing searches
  // on the bounds of the map viewport
  if (bounds && !location && !boundary_id) {
    return await searchBounds(params)
  }
  return {}
}
