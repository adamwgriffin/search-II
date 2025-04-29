import { usePathname, useRouter } from 'next/navigation';
import { getNewLocationQueryString } from '~/lib/listingSearchParams';
import { useSearchParamsState } from '~/providers/SearchParamsProvider';
import { type SearchState } from '~/zod_schemas/searchStateSchema';

export function useSearchNewLocation() {
  const router = useRouter();
  const pathname = usePathname();
  const { searchParamsState } = useSearchParamsState();

  return function (newLocationState: SearchState) {
    const updatedQueryString = getNewLocationQueryString(
      searchParamsState,
      newLocationState
    );
    router.push(`${pathname}?${updatedQueryString}`);
  };
}
