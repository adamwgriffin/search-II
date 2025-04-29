'use client';

import { Map, useMap } from '@vis.gl/react-google-maps';
import { useCallback, useEffect, useRef } from 'react';
import { BoundaryControl } from '~/components/BoundaryControl';
import { MapBoundary } from '~/components/MapBoundary';
import { ZoomControl } from '~/components/ZoomControl';
import { useSearchResultsData } from '~/hooks/useSearchResultsData';
import { useSearchState } from '~/providers/SearchStateProvider';
import {
  convertURLBoundsParamToLatLngBoundsLiteral,
  getAvailableBoundsFromSearchResults
} from '~/lib/boundary';
import {
  GoogleMapsMapOptions,
  MapBoundaryStyleOptions
} from '~/lib/googleMapsOptions';
import { ListingMarker } from './ListingMarker';
import { getNewParamsFromCurrentState } from '~/lib/listingSearchParams';

export function ListingMap() {
  const map = useMap();
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

  const handleIdle = useCallback(() => {
    if (!updateFiltersOnMapIdle.current) return;
    updateFiltersOnMapIdle.current = false;
    if (!map) return;
    const newParams = getNewParamsFromCurrentState(map, results.boundaryId);
    setSearchState(newParams);
  }, [results.boundaryId, map, setSearchState]);

  const handleZoomIn = useCallback(() => {
    if (!map) return;
    const newParams = getNewParamsFromCurrentState(map, results.boundaryId);
    newParams.zoom =
      typeof newParams.zoom === 'number' ? newParams.zoom + 1 : 1;
    setSearchState(newParams);
  }, [map, results.boundaryId, setSearchState]);

  const handleZoomOut = useCallback(() => {
    if (!map) return;
    const newParams = getNewParamsFromCurrentState(map, results.boundaryId);
    newParams.zoom =
      typeof newParams.zoom === 'number' ? newParams.zoom - 1 : 1;
    setSearchState(newParams);
  }, [map, results.boundaryId, setSearchState]);

  const handleUserAdjustedMap = useCallback(() => {
    updateFiltersOnMapIdle.current = true;
  }, []);

  useEffect(() => {
    map?.getDiv()?.addEventListener('wheel', handleUserAdjustedMap);
    return () =>
      map?.getDiv()?.removeEventListener('wheel', handleUserAdjustedMap);
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
        overflow: 'hidden',
        borderRadius: '.5rem'
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
