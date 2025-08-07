"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useSearchState } from "@/providers/SearchStateProvider";

export function LotSize() {
  const { searchState, setSearchState } = useSearchState();

  return (
    <fieldset>
      <legend className="form-heading">Lot Size</legend>
      <Select
        onValueChange={(value) =>
          setSearchState({ lot_size_min: Number(value) || null })
        }
        value={String(searchState.lot_size_min ?? 0)}
      >
        <SelectTrigger
          aria-label="Lot Size"
          className="w-full rounded-full dark:bg-gray-600 dark:text-inherit"
        >
          <SelectValue placeholder="Select lot size" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="0">No Min</SelectItem>
          <SelectItem value="2000">2,000+ sqft</SelectItem>
          <SelectItem value="3000">3,000+ sqft</SelectItem>
          <SelectItem value="5000">5,000+ sqft</SelectItem>
          <SelectItem value="7500">7,500+ sqft</SelectItem>
          <SelectItem value="10890">0.25+ acre</SelectItem>
          <SelectItem value="21780">0.5+ acre</SelectItem>
          <SelectItem value="43560">1+ acre</SelectItem>
          <SelectItem value="87120">2+ acre</SelectItem>
          <SelectItem value="217800">5+ acre</SelectItem>
          <SelectItem value="435600">10+ acre</SelectItem>
        </SelectContent>
      </Select>
    </fieldset>
  );
}
