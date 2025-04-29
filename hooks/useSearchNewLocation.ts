import { usePathname, useRouter } from 'next/navigation';
import { getNewLocationQueryString } from '~/lib/listingSearchParams';
import { useSearchParamsState } from '~/providers/SearchParamsProvider';
import type { URLParams } from '~/types';

export function useSearchNewLocation() {
  const router = useRouter();
  const pathname = usePathname();
  const { searchParamsState } = useSearchParamsState();

  return function (newLocationParams: URLParams) {
    const updatedQueryString = getNewLocationQueryString(
      searchParamsState,
      newLocationParams
    );
    console.log(updatedQueryString);
    router.push(`${pathname}?${updatedQueryString}`);
  };
}
