import { Beds } from '~/components/Beds'
import { Baths } from '~/components/Baths'
import { Suspense } from 'react'

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
