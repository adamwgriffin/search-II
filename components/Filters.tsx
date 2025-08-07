"use client";

import { Baths } from "@/components/Baths";
import { Beds } from "@/components/Beds";
import { ClearFilters } from "@/components/ClearFilters";
import { ForSaleFilters } from "@/components/ForSaleFilters";
import { PropertyTypes } from "@/components/PropertyTypes";
import { SearchType } from "@/components/SearchType";
import { SoldInLast } from "@/components/SoldInLast";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { SearchTypes } from "@/lib";
import { ParamDefaults } from "@/lib/listingSearchParams";
import { useSearchState } from "@/providers/SearchStateProvider";
import { LotSize } from "@/components/LotSize";
import { Features } from "@/components/Features";

export function Filters() {
  const { searchState } = useSearchState();

  const searchType = searchState.search_type ?? ParamDefaults.search_type;

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
          {searchType === SearchTypes.Buy && <ForSaleFilters />}
          {searchType !== SearchTypes.Rent && <PropertyTypes />}
          {searchType === SearchTypes.Sold && <SoldInLast />}
          <LotSize />
          <Features />
          <ClearFilters />
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
