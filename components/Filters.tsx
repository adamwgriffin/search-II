import { Baths } from "@/components/Baths";
import { Beds } from "@/components/Beds";
import { ClearFilters } from "@/components/ClearFilters";
import { IncludePending } from "@/components/IncludePending";
import { OpenHouses } from "@/components/OpenHouses";
import { PropertyTypes } from "@/components/PropertyTypes";
import { SearchType } from "@/components/SearchType";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

export function Filters() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="rounded-full dark:bg-gray-600 dark:text-inherit"
        >
          Filters
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <form className="flex flex-col gap-4 p-4 max-w-md">
          <SearchType />
          <Beds />
          <Baths />
          <div className="flex flex-col gap-1">
            <OpenHouses />
            <IncludePending />
          </div>
          <PropertyTypes />
          <ClearFilters />
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
