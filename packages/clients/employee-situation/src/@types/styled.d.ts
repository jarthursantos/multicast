import { Colors } from '@shared/web-styles'
import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    title: string

    colors: Colors
  }
}
