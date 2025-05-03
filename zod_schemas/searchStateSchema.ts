import { z } from "zod";
import { booleanEnum } from "~/zod_schemas";
import {
  sortDirectionSchema,
  sortTypeSchema
} from "./listingSearchParamsSchema";

/** A type which represents params that can be added to the url. Most of these
 * are listing service request filters but there are additional params for app
 * state as well. */
export const searchStateSchema = z
  .object({
    search_type: z.enum(["buy", "rent", "sold"]),
    address: z.string(),
    place_id: z.string(),
    bounds: z.string(),
    boundary_id: z.string(),
    zoom: z.coerce.number(),
    property_type: z.string(),
    include_pending: booleanEnum.default("false"),
    open_houses: booleanEnum,
    page_index: z.coerce.number(),
    price_min: z.coerce.number(),
    price_max: z.coerce.number(),
    beds_min: z.coerce.number(),
    baths_min: z.coerce.number(),
    sqft_min: z.coerce.number(),
    sqft_max: z.coerce.number(),
    sort_by: sortTypeSchema,
    sort_direction: sortDirectionSchema,
    lot_size_min: z.coerce.number(),
    year_built_min: z.coerce.number(),
    year_built_max: z.coerce.number(),
    waterfront: booleanEnum,
    view: booleanEnum,
    fireplace: booleanEnum,
    basement: booleanEnum,
    garage: booleanEnum,
    new_construction: booleanEnum,
    pool: booleanEnum,
    air_conditioning: booleanEnum,
    sold_in_last: z.coerce.number()
  })
  .partial();

export type SearchState = z.infer<typeof searchStateSchema>;

// Using "null" in an updated indicates that the value should be removed
export type SearchStateUpdate = {
  [K in keyof SearchState]: SearchState[K] | null;
};
