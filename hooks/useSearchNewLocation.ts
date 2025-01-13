import omit from 'lodash/omit'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import {
  GeospatialSearchParams,
  objectToQueryString
} from '~/lib/listingSearchParams'

export function useSearchNewLocation() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  return function (address: string) {
    // Remove params for searching current location with a geospatial search
    // since we're now going to be geocoding a new location. We no only want
    // filter params.
    const filterParams = omit(
      Object.fromEntries(searchParams),
      GeospatialSearchParams
    )
    const updatedQueryString = objectToQueryString({ ...filterParams, address })
    router.push(`${pathname}?${updatedQueryString}`)
  }
}
