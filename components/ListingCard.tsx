import Image from "next/image";
import { formatPrice } from "@/lib/listingHelpers";
import { type Listing } from "@/types";

export type ListingCardsProps = {
  listing: Listing;
};

export function ListingCard({ listing }: ListingCardsProps) {
  return (
    <div className="flex flex-col gap-1">
      <Image
        src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${listing.photoGallery[0].url}`}
        alt="Listing Image"
        width={300}
        height={300}
        className="w-full rounded-lg aspect-square object-cover"
        priority
      />
      <div className="font-medium text-xl pt-2">
        {formatPrice(listing.soldPrice || listing.listPrice)}
      </div>
      <div className="flex gap-x-2">
        {!!listing.beds && <div>{listing.beds}bd</div>}
        {!!listing.baths && <div>{listing.baths}ba</div>}
        {!!listing.sqft && <div>{listing.sqft.toLocaleString()} sqft</div>}
      </div>
      <address className="not-italic">
        <div>{listing.address.line1}</div>
        <div>{`${listing.address.city}, ${listing.address.state} ${listing.address.zip}`}</div>
      </address>
    </div>
  );
}
