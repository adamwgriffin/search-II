import { Plus, Minus } from 'lucide-react'

export type ZoomControlProps = {
  onZoomIn?: () => void
  onZoomOut?: () => void
}

export function ZoomControl({ onZoomIn, onZoomOut }: ZoomControlProps) {
  return (
    <div
      className='
        absolute bottom-2 right-4 flex flex-col items-center justify-center gap-2
        rounded-md shadow-sm shadow-gray-500 bg-background p-2
      '
    >
      <button aria-label='Zoom in' className='' onClick={onZoomIn}>
        <Plus />
      </button>
      <button aria-label='Zoom out' className='' onClick={onZoomOut}>
        <Minus />
      </button>
    </div>
  )
}
