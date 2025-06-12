import omit from "lodash/omit";
import isEmpty from "lodash/isEmpty";
import { http } from "@/lib/http";
import type { ListingSearchResponse } from "@/types";
import { type SearchState } from "@/zod_schemas/searchStateSchema";
import { type ListingFilterParams } from "@/zod_schemas/listingSearchParamsSchema";

/** Remove params from search state that the listing service does not recognize.
 Some of the params in state are only meant for the app state, or are meant to
 be transformed into more verbose listing service params once when used to make
 a request. */
function removeNonListingServiceParams(
  state: SearchState
): Partial<ListingFilterParams> {
  return omit(state, "bounds", "boundary_id", "zoom", "open_houses");
}

/** Params that should only be used for a new search with the /geocode endpoint */
function removeNonGeospatialParams(state: SearchState) {
  return omit(state, "address", "place_id");
}

function convertBoundsParamToListingServiceBounds(boundsString: string) {
  const [bounds_south, bounds_west, bounds_north, bounds_east] =
    boundsString.split(",");
  return { bounds_south, bounds_west, bounds_north, bounds_east };
}

function paramsForGeospatialSearch(state: SearchState) {
  if (typeof state.bounds !== "string") {
    throw new Error("Bounds not included in params");
  }
  const listingServiceBounds = convertBoundsParamToListingServiceBounds(
    state.bounds
  );
  const newParams = removeNonListingServiceParams(
    removeNonGeospatialParams(state)
  );
  return { ...newParams, ...listingServiceBounds };
}

async function searchNewLocation(state: SearchState) {
  return http<ListingSearchResponse>(
    "/api/listing/search/geocode",
    removeNonListingServiceParams(state)
  );
}

async function searchCurrentLocation(state: SearchState) {
  return http<ListingSearchResponse>(
    `/api/listing/search/boundary/${state.boundary_id}`,
    paramsForGeospatialSearch(state)
  );
}

async function searchBounds(state: SearchState) {
  return http<ListingSearchResponse>(
    "/api/listing/search/bounds",
    paramsForGeospatialSearch(state)
  );
}

export async function fetchListings(state: SearchState) {
  if (isEmpty(state)) return {};

  const location = state.place_id || state.address;
  const { bounds, boundary_id } = state;
  // The user entered a new search in the search field
  if (location && !bounds) {
    return await searchNewLocation(state);
  }
  // We have previously performed a new search and now we are performing subsequent
  // searches on the same location with different criteria
  if (location && bounds && boundary_id) {
    return await searchCurrentLocation(state);
  }
  // The user removed the location boundary so we are just performing searches
  // on the bounds of the map viewport
  if (bounds && !location && !boundary_id) {
    return await searchBounds(state);
  }
  return {};
}
