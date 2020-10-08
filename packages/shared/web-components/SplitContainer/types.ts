import { ReactElement } from 'react'

export interface SpliContainerProps {
  resizeLocation?: 'left' | 'right'
  resizeWidth?: number | string
  children: [ReactElement, ReactElement]
}
