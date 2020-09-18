import { Colors } from './colors'
import 'styled-components/native'

declare module 'styled-components/native' {
  export interface DefaultTheme {
    title: string

    colors: Colors
  }
}
