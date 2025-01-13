import { Beds } from '~/components/Beds'
import { Baths } from '~/components/Baths'

export function Filters() {
  return (
    <form className='flex gap-4'>
      <Beds />
      <Baths />
    </form>
  )
}
