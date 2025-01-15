import { type NextRequest, NextResponse } from 'next/server'
import { http } from '~/lib/http'

type BoundaryParams = {
  boundary_id: string
}

export async function GET(
  request: NextRequest,
  { params }: { params: BoundaryParams }
) {
  if (request.nextUrl.searchParams.toString() === '') {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
  try {
    const { boundary_id } = await params
    const res = await http(
      `http://localhost:3001/listing/search/boundary/${boundary_id}?${request.nextUrl.searchParams.toString()}`
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
