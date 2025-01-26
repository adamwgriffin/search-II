'use client'

import * as React from 'react'
import { Moon, Sun, Computer } from 'lucide-react'
import { useTheme } from 'next-themes'
import { cn } from '~/lib/utils'

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()

  return (
    <div className='flex gap-1 p-1 rounded-full border border-gray-400'>
      <button
        className={cn({ 'text-gray-400': theme !== 'system' })}
        suppressHydrationWarning
        onClick={() => setTheme('system')}
      >
        <Computer />
      </button>
      <button
        className={cn({ 'text-gray-400': theme !== 'light' })}
        suppressHydrationWarning
        onClick={() => setTheme('light')}
      >
        <Sun />
      </button>
      <button
        className={cn({ 'text-gray-400': theme !== 'dark' })}
        suppressHydrationWarning
        onClick={() => setTheme('dark')}
      >
        <Moon />
      </button>
    </div>
  )
}
