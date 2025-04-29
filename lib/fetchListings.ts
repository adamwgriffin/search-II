import omit from 'lodash/omit';
import isEmpty from 'lodash/isEmpty';
import { http } from '~/lib/http';
import type { ListingSearchResponse } from '~/types';
import { type SearchState } from '~/zod_schemas/searchStateSchema';

function removeNonListingServiceParams(params: SearchState) {
  return omit(params, 'bounds', 'boundary_id', 'zoom');
}

function removeNonGeospatialParams(params: SearchState) {
  return omit(params, 'address', 'place_id');
}

function convertBoundsParamToListingServiceBounds(boundsString: string) {
  const [bounds_south, bounds_west, bounds_north, bounds_east] =
    boundsString.split(',');
  return { bounds_south, bounds_west, bounds_north, bounds_east };
}

function paramsForGeospatialSearch(params: SearchState) {
  if (typeof params.bounds !== 'string') {
    throw new Error('Bounds not included in params');
  }
  const listingServiceBounds = convertBoundsParamToListingServiceBounds(
    params.bounds
  );
  const newParams = removeNonListingServiceParams(
    removeNonGeospatialParams(params)
  );
  return { ...newParams, ...listingServiceBounds };
}

async function searchNewLocation(params: SearchState) {
  return http<ListingSearchResponse>(
    '/api/listing/search/geocode',
    removeNonListingServiceParams(params)
  );
}

async function searchCurrentLocation(params: SearchState) {
  return http<ListingSearchResponse>(
    `/api/listing/search/boundary/${params.boundary_id}`,
    paramsForGeospatialSearch(params)
  );
}

async function searchBounds(params: SearchState) {
  return http<ListingSearchResponse>(
    '/api/listing/search/bounds',
    paramsForGeospatialSearch(params)
  );
}

export async function fetchListings(params: SearchState) {
  if (isEmpty(params)) return {};

  const location = params.place_id || params.address;
  const { bounds, boundary_id } = params;
  // The user entered a new search in the search field
  if (location && !bounds) {
    return await searchNewLocation(params);
  }
  // We have previously performed a new search and now we are performing subsequent
  // searches on the same location with different criteria
  if (location && bounds && boundary_id) {
    return await searchCurrentLocation(params);
  }
  // The user removed the location boundary so we are just performing searches
  // on the bounds of the map viewport
  if (bounds && !location && !boundary_id) {
    return await searchBounds(params);
  }
  return {};
}
