import { ReactElement } from 'react'

import { PageProps } from './Page/types'

export interface PagerProps {
  currentPage: string
  children: ReactElement<PageProps> | ReactElement<PageProps>[]
}
