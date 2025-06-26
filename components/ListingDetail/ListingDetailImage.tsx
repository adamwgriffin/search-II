import type { Listing } from "@/types";
import ListingStatus from "@/components/ListingStatus";

export default function ListingDetailImage({ listing }: { listing: Listing }) {
  return (
    <div className="relative">
      <div className="absolute p-4">
        <ListingStatus status={listing.status} showActive />
      </div>
      <img
        src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${listing.photoGallery[0].url}`}
        alt="Listing Image"
        className="w-full rounded-lg aspect-video object-cover"
      />
    </div>
  );
}
