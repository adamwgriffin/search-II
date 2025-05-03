import { usePathname, useRouter } from "next/navigation";
import { useSearchState } from "@/providers/SearchStateProvider";
import { type SearchState } from "@/zod_schemas/searchStateSchema";
import omit from "lodash/omit";
import {
  NonGeocodeParams,
  objectToQueryString
} from "@/lib/listingSearchParams";

export function useSearchNewLocation() {
  const router = useRouter();
  const pathname = usePathname();
  const { searchState } = useSearchState();

  return function (newLocationState: SearchState) {
    // Remove params for searching current location with a geospatial search
    // since we're now going to be geocoding a new location. We no only want
    // filter params. Also remove address or place_id so that only one or the
    // other will be present in the new object
    const params = omit(searchState, [
      ...NonGeocodeParams,
      "address",
      "place_id"
    ]);
    Object.assign(params, newLocationState);
    router.push(`${pathname}?${objectToQueryString(params)}`);
  };
}
