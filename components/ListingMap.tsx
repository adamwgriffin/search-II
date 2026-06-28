"use client";

import { Map, useMap } from "@vis.gl/react-google-maps";
import { useCallback, useEffect, useRef } from "react";
import { BoundaryControl } from "@/components/BoundaryControl";
import { MapBoundary } from "@/components/MapBoundary";
import { ZoomControl } from "@/components/ZoomControl";
import { useSearchResultsData } from "@/hooks/useSearchResultsData";
import { useSearchState } from "@/providers/SearchStateProvider";
import {
  convertURLBoundsParamToLatLngBoundsLiteral,
  getAvailableBoundsFromSearchResults
} from "@/lib/boundary";
import {
  GoogleMapsMapOptions,
  MapBoundaryStyleOptions
} from "@/lib/googleMapsOptions";
import { ListingMarker } from "./ListingMarker";
import { getNewSearchStateFromMap } from "@/lib/listingSearchParams";

export function ListingMap() {
  const map = useMap();
  // We normally want to update filters to cause a new listing data fetch after
  // the map "idle" event is triggered by a user dragging the map. However, some
  // other events, such as "zoom" can also trigger this same "idle" event. We
  // need to handle zoom differently from drag events, so we use this ref as a
  // flag to be able to tell what occurred between events in order to know
  // wether we should update based on drag or zoom events.
  const updateFiltersOnMapIdle = useRef(false);
  const { searchState, setSearchState } = useSearchState();
  const results = useSearchResultsData();

  const { isFetching } = results.queryResult;

  const bounds = searchState.bounds
    ? convertURLBoundsParamToLatLngBoundsLiteral(searchState.bounds)
    : null;

  const zoom = searchState.zoom ?? null;

  const showRemoveBoundaryButton = Boolean(
    searchState.address || searchState.place_id || searchState.boundary_id
  );

  // Handle "idle" map events that were not triggered by the "zoom" event. The
  // updateFiltersOnMapIdle flag indicates wether or not to do anything.
  const handleIdle = useCallback(() => {
    if (!updateFiltersOnMapIdle.current) return;
    updateFiltersOnMapIdle.current = false;
    if (!map) return;
    const newParams = getNewSearchStateFromMap(map, results.boundaryId);
    setSearchState(newParams);
  }, [results.boundaryId, map, setSearchState]);

  const handleZoomIn = useCallback(() => {
    if (!map) return;
    const newParams = getNewSearchStateFromMap(map, results.boundaryId);
    newParams.zoom =
      typeof newParams.zoom === "number" ? newParams.zoom + 1 : 1;
    setSearchState(newParams);
  }, [map, results.boundaryId, setSearchState]);

  const handleZoomOut = useCallback(() => {
    if (!map) return;
    const newParams = getNewSearchStateFromMap(map, results.boundaryId);
    newParams.zoom =
      typeof newParams.zoom === "number" ? newParams.zoom - 1 : 1;
    setSearchState(newParams);
  }, [map, results.boundaryId, setSearchState]);

  // If the user adjusted the map by dragging it, set this flag so that we know
  // to update filters when the "idle" event is subsequently triggered.
  const handleUserAdjustedMap = useCallback(() => {
    updateFiltersOnMapIdle.current = true;
  }, []);

  // The Map object doesn't have scroll wheel event so you have to add it by
  // using a native DOM listener yourself.
  useEffect(() => {
    map?.getDiv()?.addEventListener("wheel", handleUserAdjustedMap);
    return () =>
      map?.getDiv()?.removeEventListener("wheel", handleUserAdjustedMap);
  }, [handleUserAdjustedMap, map]);

  // No bounds param in the url means it's a new search, so call fitBounds()
  // to adjust the map to fit the new boundary that was returned from the
  // search results
  useEffect(() => {
    if (!map || bounds) return;
    const feature = results.geoJSONBoundary?.id
      ? map.data.getFeatureById(results.geoJSONBoundary.id)
      : undefined;
    const searchResultsBounds = getAvailableBoundsFromSearchResults(
      feature,
      results.viewport
    );
    if (searchResultsBounds) {
      map.fitBounds(searchResultsBounds);
    }
  }, [map, results.geoJSONBoundary, bounds, results.viewport]);

  // Bounds param is present in the URL, which means we're searching an
  // existing location, so use the bounds & zoom from the url to adjust the
  // map
  useEffect(() => {
    if (!map) return;
    if (bounds) {
      const center = new google.maps.LatLngBounds(bounds).getCenter();
      map.setCenter(center);
      if (zoom) {
        map.setZoom(zoom);
      }
    }
  }, [map, bounds, zoom]);

  return (
    <Map
      style={{
        overflow: "hidden",
        borderRadius: ".5rem"
      }}
      {...GoogleMapsMapOptions}
      onDragend={handleUserAdjustedMap}
      onIdle={handleIdle}
    >
      {results.listings.map((l) => (
        <ListingMarker
          key={l._id}
          latitude={l.latitude}
          longitude={l.longitude}
          listPrice={l.listPrice}
          soldPrice={l.soldPrice}
          loading={isFetching}
        />
      ))}
      <MapBoundary
        boundary={results.geoJSONBoundary}
        {...MapBoundaryStyleOptions}
      />
      {showRemoveBoundaryButton && <BoundaryControl loading={isFetching} />}
      <ZoomControl
        loading={isFetching}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
      />
    </Map>
  );
}
