import type { SearchParamsInit } from "@/types";
import isEqual from "lodash/isEqual";
import omit from "lodash/omit";
import omitBy from "lodash/omitBy";
import type {
  SearchStateUpdate,
  SearchState
} from "@/zod_schemas/searchStateSchema";

export const NonGeocodeParams = Object.freeze([
  "bounds",
  "boundary_id",
  "zoom",
  "page_index"
]);

/**
 * Keep track of a subset of Listing Service param defaults so that we can avoid
 * sending them in the request if the service would behave this way be default
 * anyway
 */
export const ParamDefaults: SearchState = Object.freeze({
  page_index: 0,
  page_size: 20,
  sort_by: "listedDate",
  sort_direction: "desc"
});

/**
 * Remove params marked for removal, as well as params that use default values,
 * or params that otherwise could cause a conflict. Setting a param to the
 * falsey values below indicates indicates that it was marked for removal.
 */
export function removeUnwantedParams(params: SearchStateUpdate) {
  return omitBy(params, (value, key) => {
    return (
      value === null ||
      value === undefined ||
      value === "" ||
      isEqual(ParamDefaults[key as keyof SearchState], value)
    );
  });
}

export function objectToQueryString(params: SearchState) {
  // Casting params as SearchParamsInit because the current type provided by
  // Typescript for this is not correct
  return new URLSearchParams(params as SearchParamsInit)
    .toString()
    .replace(/%2C/g, ","); // Don't encode commas in url params
}

export function getUpdatedParams(
  currentState: SearchState,
  newState: SearchStateUpdate
) {
  // Only keep the page_index if it was specifically added to the update in
  // newParams. Any other type of search adjustment should request results
  // starting on the first page
  const mergedParams = {
    ...omit(currentState, "page_index"),
    ...newState
  };
  return removeUnwantedParams(mergedParams);
}

export function getUpdatedQueryString(
  currentState: SearchState,
  newState: SearchStateUpdate
) {
  return objectToQueryString(getUpdatedParams(currentState, newState));
}

export function getNewParamsFromCurrentState(
  map: google.maps.Map,
  boundaryId: string | null | undefined
) {
  const bounds = map.getBounds()?.toUrlValue();
  if (!bounds) throw new Error("No bounds present in map instance");
  const params: SearchState = { bounds };
  if (boundaryId) {
    params.boundary_id = boundaryId;
  }
  const zoom = map.getZoom();
  if (zoom) {
    params.zoom = zoom;
  }
  return params;
}
