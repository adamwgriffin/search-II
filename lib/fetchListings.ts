import omit from 'lodash/omit'
import { http } from '~/lib/http'
import type {
  ListingSearchBoundaryResponse,
  ListingSearchGeocodeResponse,
  NextSearchParams
} from '~/types'

function paramsForGeospatialSearch(params: NextSearchParams) {
  return omit(params, 'boundary_id', 'address', 'zoom')
}

async function getListings<T>(url: string, params: NextSearchParams) {
  return http<T>(
    `${process.env.NEXT_PUBLIC_LISTING_SEARCH_ENDPOINT!}${url}`,
    params,
    {
      cache: 'force-cache'
    }
  )
}

async function searchNewLocation(params: NextSearchParams) {
  return getListings<ListingSearchGeocodeResponse>('/geocode', params)
}

async function searchCurrentLocation(params: NextSearchParams) {
  return getListings<ListingSearchBoundaryResponse>(
    params.boundary_id ? `/boundary/${params.boundary_id}` : '/bounds',
    paramsForGeospatialSearch(params)
  )
}

export async function fetchListings(params: NextSearchParams) {
  if (!params || Object.keys(params).length === 0) return null
  try {
    return params.bounds_north
      ? searchCurrentLocation(params)
      : searchNewLocation(params)
  } catch (error) {
    console.error(error)
    return null
  }
}
