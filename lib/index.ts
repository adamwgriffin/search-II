/** Pause for `time` milliseconds.
 * @example
 * await sleep(1000)
 */
export function sleep(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
