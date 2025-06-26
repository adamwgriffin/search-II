import type { Address } from "@/types";
import { cn } from "@/lib/utils";

export type ListingAddressProps = { address: Address; large?: boolean };

export default function ListingAddress({
  address,
  large = false
}: ListingAddressProps) {
  return (
    <address className="not-italic">
      <div className={cn(large && "text-2xl")}>{address.line1}</div>
      <div>{`${address.city}, ${address.state} ${address.zip}`}</div>
    </address>
  );
}
