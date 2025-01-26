import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '~/components/ui/dropdown-menu'
import { Beds } from '~/components/Beds'
import { Baths } from '~/components/Baths'
import { Suspense } from 'react'

export function Filters() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>Filters</DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <form className='flex flex-col gap-4 p-4'>
          <Suspense>
            <Beds />
            <Baths />
          </Suspense>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
