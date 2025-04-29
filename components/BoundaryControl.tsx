'use client';

import { useMap } from '@vis.gl/react-google-maps';
import { TextLoading } from '~/components/TextLoading';
import { useSearchParamsState } from '~/providers/SearchParamsProvider';

export type BoundaryControlProps = {
  loading?: boolean;
};

export function BoundaryControl({ loading = false }: BoundaryControlProps) {
  const { updateSearchParams } = useSearchParamsState();
  const map = useMap();

  return (
    <div className='absolute bottom-2 left-1/2 transform -translate-x-1/2'>
      <button
        disabled={loading}
        className='rounded-md shadow-xs p-2 shadow-gray-500 bg-background dark:bg-gray-600'
        onClick={() => {
          if (!map) return;
          const bounds = map?.getBounds()?.toUrlValue();
          if (!bounds) throw new Error('No bounds present in map instance');
          // Setting params to null removes them from the request and indicates
          // to the fetchListings function that we should search by bounds
          // instead of location
          updateSearchParams({
            bounds,
            address: null,
            place_id: null,
            boundary_id: null
          });
        }}
      >
        <TextLoading loading={loading}>Remove Boundary</TextLoading>
      </button>
    </div>
  );
}
