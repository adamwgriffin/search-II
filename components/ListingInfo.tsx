import type { Listing } from "@/types";

export type ListingInfoProps = {
  listing: Listing;
  bedsLabel?: string;
  bathsLabel?: string;
};

export function ListingInfo({
  listing,
  bedsLabel = "bd",
  bathsLabel = "ba"
}: ListingInfoProps) {
  if (listing.propertyType === "land") {
    return (
      <div className="flex gap-2">
        <div>{listing.lotSize} lot</div>
      </div>
    );
  }
  return (
    <div className="flex gap-2">
      {!!listing.beds && (
        <div>
          {listing.beds}
          {bedsLabel}
        </div>
      )}
      {!!listing.baths && (
        <div>
          {listing.baths}
          {bathsLabel}
        </div>
      )}
      {!!listing.sqft && <div>{listing.sqft.toLocaleString()} sqft</div>}
    </div>
  );
}
