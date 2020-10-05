import { useEffect } from 'react'

import { remote } from 'electron'

export function useCloseWindow() {
  useEffect(() => {
    function closeWindow(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        remote.getCurrentWindow().close()
      }
    }

    window.addEventListener('keyup', closeWindow)

    return () => {
      window.removeEventListener('keyup', closeWindow)
    }
  })
}
