import { Filters } from '~/components/Filters'
import { Logo } from '~/components/Logo'
import { SearchField } from '~/components/SearchField'
import { UserMenu } from '~/components/UserMenu'
import { Suspense } from 'react'

export function SearchHeader() {
  return (
    <header className='grid grid-cols-[1fr_auto_auto_minmax(0,1fr)] items-center gap-8 p-4'>
      <Logo />
      <Suspense>
        <SearchField />
      </Suspense>
      <Filters />
      <UserMenu />
    </header>
  )
}
