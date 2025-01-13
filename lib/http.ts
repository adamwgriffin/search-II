export type SearchParamsInit =
  | string
  | string[][]
  | Record<string, string>
  | URLSearchParams
  | undefined

export async function http<T>(
  url: string,
  searchParams: object | undefined,
  options: RequestInit = {}
) {
  const urlWithParams = searchParams
    ? `${url}?${objectToQueryString(searchParams)}`
    : url
  const res = await fetch(urlWithParams, options)
  if (!res.ok) {
    throw new Error(await res.text())
  }
  return (await res.json()) as T
}

function objectToQueryString(params: object) {
  // Casting params as SearchParamsInit because the current type provided by Typescript for this is not correct
  return new URLSearchParams(
    params as SearchParamsInit
  ).toString()
}
