export const SearchTypes = Object.freeze({
  Buy: "buy",
  Rent: "rent",
  Sold: "sold"
} as const);

export const DefaultSoldInLast = 730; // 2 years in days

/** Pause for `time` milliseconds.
 * @example
 * await sleep(1000)
 */
export function sleep(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
