import { FaUser } from 'react-icons/fa'

export function UserMenu() {
  return (
    <div className='flex justify-end'>
      <div className='shrink cursor-pointer rounded-full border border-gray-400 p-2'>
        <FaUser className='text-3xl text-gray-400' />
      </div>
    </div>
  )
}
