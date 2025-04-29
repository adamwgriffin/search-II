import { usePathname, useRouter } from 'next/navigation';
import { getNewLocationQueryString } from '~/lib/listingSearchParams';
import { useSearchState } from '~/providers/SearchStateProvider';
import { type SearchState } from '~/zod_schemas/searchStateSchema';

export function useSearchNewLocation() {
  const router = useRouter();
  const pathname = usePathname();
  const { searchState } = useSearchState();

  return function (newLocationState: SearchState) {
    const updatedQueryString = getNewLocationQueryString(
      searchState,
      newLocationState
    );
    router.push(`${pathname}?${updatedQueryString}`);
  };
}
