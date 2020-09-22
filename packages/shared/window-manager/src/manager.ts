import { BrowserWindow, BrowserWindowConstructorOptions } from 'electron'
import isDev from 'electron-is-dev'

import { WindowSaver } from './types'
import { resolveURL } from './utils'

export class WindowManager {
  private windows: WindowSaver
  private defaultOptions: BrowserWindowConstructorOptions

  constructor(defaultOptions: BrowserWindowConstructorOptions) {
    this.windows = {}
    this.defaultOptions = defaultOptions || {}
  }

  createMainWindow(options: BrowserWindowConstructorOptions): string {
    const mainWindow = new BrowserWindow(this.generateOptions(options))

    mainWindow.loadURL(resolveURL())

    !isDev && mainWindow.removeMenu()

    return this.registerWindow(mainWindow, 'mainWindow')
  }

  createWindow(url: string, options: BrowserWindowConstructorOptions): string {
    const windowName = this.generateWindowName(url)

    if (this.windowExists(windowName)) {
      this.windows[windowName]?.focus()

      return
    }

    const window = new BrowserWindow(this.generateOptions(options))

    window.loadURL(resolveURL(url))

    !isDev && window.removeMenu()

    return this.registerWindow(window, windowName)
  }

  getWindow(windowName: string): BrowserWindow | undefined {
    if (this.windowExists(windowName)) {
      return this.windows[windowName]
    }

    return undefined
  }

  private generateOptions(options: BrowserWindowConstructorOptions) {
    return { ...this.defaultOptions, ...options }
  }

  private windowExists(name: string) {
    return !!this.windows[name]
  }

  private generateWindowName(url: string) {
    return `--${url}`
  }

  private registerWindow(window: BrowserWindow, name: string) {
    window.on('closed', () => {
      this.windows[name] = null
    })

    this.windows[name] = window

    return name
  }
}
