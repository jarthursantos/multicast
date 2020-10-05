import { useEffect } from 'react'

import { closeWindow } from '~/util/close-window'

export function useCloseWindow() {
  useEffect(() => {
    function handleCloseWindow(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        closeWindow()
      }
    }

    window.addEventListener('keyup', handleCloseWindow)

    return () => {
      window.removeEventListener('keyup', handleCloseWindow)
    }
  })
}
