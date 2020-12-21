import { useState, useEffect } from 'react'

interface IWindowSize {
  width: number
  height: number
}

interface IUseWindowSizeOptions {
  watch?: boolean
}

export function useWindowSize(
  options: IUseWindowSizeOptions = { watch: true }
): IWindowSize {
  const { watch } = options

  function getSize() {
    return {
      width: window.innerWidth,
      height: window.innerHeight
    }
  }

  const [windowSize, setWindowSize] = useState(getSize)

  useEffect(() => {
    function handleResize() {
      setWindowSize(getSize())
    }

    if (watch) {
      window.addEventListener('resize', handleResize)

      return () => {
        window.removeEventListener('resize', handleResize)
      }
    }
  }, [watch])

  return windowSize
}
