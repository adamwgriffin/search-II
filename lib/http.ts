import { objectToQueryString } from './listingSearchParams'

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

