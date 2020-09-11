import { BrowserWindow } from 'electron'

export interface WindowSaver {
  [key: string]: BrowserWindow | null
}
