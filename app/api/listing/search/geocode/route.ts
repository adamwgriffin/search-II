import { type NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  if (request.nextUrl.searchParams.toString() === '') {
    return NextResponse.json({})
  }
  console.log("url:", `http://localhost:3001/listing/search/geocode?${request.nextUrl.searchParams.toString()}`)
  try {
    const res = await fetch(
      `http://localhost:3001/listing/search/geocode?${request.nextUrl.searchParams.toString()}`
    )
    if (!res.ok) {
      console.error("Error in try block:", res)
      return NextResponse.json(res, { status: res.status })
    }
    const body = await res.json()
    return NextResponse.json(body)
  } catch (error) {
    console.error("Error in catch block:", error)
  }
}
