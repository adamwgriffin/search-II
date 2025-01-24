import { Suspense } from 'react'
import { Baths } from '~/components/Baths'
import { Beds } from '~/components/Beds'

export function Filters() {
  return (
    <form className='flex gap-4'>
      <Suspense>
        <Beds />
        <Baths />
      </Suspense>
    </form>
  )
}
