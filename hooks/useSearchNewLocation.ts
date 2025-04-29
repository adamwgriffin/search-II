import { usePathname, useRouter } from 'next/navigation';
import { getNewLocationQueryString } from '~/lib/listingSearchParams';
import { useSearchParamsState } from '~/providers/SearchParamsProvider';
import { type SearchParams } from '~/zod_schemas/searchParamsSchema';

export function useSearchNewLocation() {
  const router = useRouter();
  const pathname = usePathname();
  const { searchParamsState } = useSearchParamsState();

  return function (newLocationParams: SearchParams) {
    const updatedQueryString = getNewLocationQueryString(
      searchParamsState,
      newLocationParams
    );
    router.push(`${pathname}?${updatedQueryString}`);
  };
}
