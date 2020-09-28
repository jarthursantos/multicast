import { DefaultTheme } from 'styled-components'

import dark from './dark'
import light from './light'

export enum Themes {
  DARK = 'DARK',
  LIGHT = 'LIGHT'
}

export interface ThemeSelect {
  dark: DefaultTheme
  light: DefaultTheme
}

export function selectTheme(theme: Themes): DefaultTheme {
  if (theme === Themes.DARK) {
    return dark
  }

  return light
}
