import { IncludePending } from "@/components/IncludePending";
import { OpenHouses } from "@/components/OpenHouses";

export function ForSaleFilters() {
  return (
    <fieldset className="flex flex-col gap-1">
      <OpenHouses />
      <IncludePending />
    </fieldset>
  );
}
