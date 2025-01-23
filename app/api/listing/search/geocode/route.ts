import { type NextRequest, NextResponse } from 'next/server'
import { http } from '~/lib/http'

export async function GET(request: NextRequest) {
  if (request.nextUrl.searchParams.toString() === '') {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
  try {
    const res = await http(
      `http://localhost:3001/listing/search/geocode?${request.nextUrl.searchParams.toString()}`
    )
    return NextResponse.json(res)
  } catch (error) {
    console.error('Error in catch block:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
