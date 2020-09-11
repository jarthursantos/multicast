import { BrowserWindow, BrowserWindowConstructorOptions } from 'electron'

import { WindowSaver } from './types'
import { resolveURL } from './utils'

export class WindowManager {
  private windows: WindowSaver
  private defaultOptions: BrowserWindowConstructorOptions

  constructor(defaultOptions: BrowserWindowConstructorOptions) {
    this.windows = {}
    this.defaultOptions = defaultOptions || {}
  }

  createMainWindow(options: BrowserWindowConstructorOptions) {
    const mainWindow = new BrowserWindow(this.generateOptions(options))

    mainWindow.loadURL(resolveURL())

    this.registerWindow(mainWindow, 'mainWindow')
  }

  createWindow(url: string, options: BrowserWindowConstructorOptions) {
    const windowName = this.generateWindowName(url)

    if (this.windowExists(windowName)) {
      this.windows[windowName]?.focus()

      return
    }

    const window = new BrowserWindow(this.generateOptions(options))

    window.loadURL(resolveURL(url))

    this.registerWindow(window, windowName)
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
  }
}
