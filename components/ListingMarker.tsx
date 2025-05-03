import { AdvancedMarker } from "@vis.gl/react-google-maps";
import { TextLoading } from "@/components/TextLoading";
import { formatPriceAbbreviated } from "@/lib/listingHelpers";
import { type Listing } from "@/types";

export type ListingMarkerProps = Pick<
  Listing,
  "latitude" | "longitude" | "listPrice" | "soldPrice"
> & { loading: boolean };

export function ListingMarker({
  latitude,
  longitude,
  listPrice,
  soldPrice,
  loading
}: ListingMarkerProps) {
  return (
    <AdvancedMarker
      position={{
        lat: latitude,
        lng: longitude
      }}
    >
      <div
        className="flex items-center justify-center
          rounded-full min-h-6 min-w-12
          shadow-md shadow-gray-500 
          font-medium text-black dark:text-white bg-background dark:bg-gray-600"
      >
        <TextLoading loading={loading}>
          {formatPriceAbbreviated(soldPrice || listPrice)}
        </TextLoading>
      </div>
    </AdvancedMarker>
  );
}
