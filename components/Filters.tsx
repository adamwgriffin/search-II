import { Suspense } from "react";
import { Baths } from "@/components/Baths";
import { Beds } from "@/components/Beds";
import { Button } from "@/components/ui/button";
import { OpenHouses } from "@/components/OpenHouses";
import { IncludePending } from "@/components/IncludePending";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { ClearFilters } from "@/components/ClearFilters";
import { PropertyTypes } from "@/components/PropertyTypes";

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
          <Suspense>
            <Beds />
            <Baths />
            <OpenHouses />
            <IncludePending />
            <PropertyTypes />
            <ClearFilters />
          </Suspense>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
