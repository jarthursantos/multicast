import { createContext } from 'react'

import { AxiosContextProps } from './types'

export const AxiosContext = createContext<AxiosContextProps>(undefined)
