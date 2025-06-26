import ListingAddress from "@/components/ListingAddress";
import { ListingInfo } from "@/components/ListingInfo";
import ListingStatus from "@/components/ListingStatus";
import { formatPrice } from "@/lib/listingHelpers";
import { type Listing } from "@/types";
import Image from "next/image";

export type ListingCardsProps = {
  listing: Listing;
};

export function ListingCard({ listing }: ListingCardsProps) {
  return (
    <div className="flex flex-col gap-1">
      <div className="relative">
        <div className="absolute p-2">
          <ListingStatus status={listing.status} />
        </div>
        <Image
          src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${listing.photoGallery[0].url}`}
          alt="Listing Image"
          width={300}
          height={300}
          className="w-full rounded-lg aspect-square object-cover"
          priority
        />
      </div>
      <div className="font-medium text-xl pt-2">
        {formatPrice(listing.soldPrice || listing.listPrice)}
      </div>
      <div className="flex gap-x-2">
        <ListingInfo listing={listing} />
      </div>
      <ListingAddress address={listing.address} />
    </div>
  );
}
