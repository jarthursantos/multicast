import React, { useEffect } from 'react'

export interface PageProps {
  title: string
}

const Page: React.FC<PageProps> = ({ title, children }) => {
  useEffect(() => {
    document.title = title
  }, [title])

  return <>{children}</>
}

export { Page }
