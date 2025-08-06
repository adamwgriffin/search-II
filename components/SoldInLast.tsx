"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useSearchState } from "@/providers/SearchStateProvider";

export function SoldInLast() {
  const { searchState, setSearchState } = useSearchState();

  return (
    <fieldset>
      <legend className="form-heading">Sold in Last</legend>
      <Select
        onValueChange={(value) =>
          setSearchState({ sold_in_last: Number(value) })
        }
        value={String(searchState.sold_in_last ?? 730)}
      >
        <SelectTrigger
          aria-label="Sold In Last"
          className="w-full rounded-full dark:bg-gray-600 dark:text-inherit"
        >
          <SelectValue placeholder="Select sold in last date" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="7">Week</SelectItem>
          <SelectItem value="30">Month</SelectItem>
          <SelectItem value="90">3 Months</SelectItem>
          <SelectItem value="180">6 Months</SelectItem>
          <SelectItem value="365">Year</SelectItem>
          <SelectItem value="730">2 Years</SelectItem>
          <SelectItem value="1095">3 Years</SelectItem>
          <SelectItem value="1825">5 Years</SelectItem>
        </SelectContent>
      </Select>
    </fieldset>
  );
}
