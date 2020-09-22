export interface Props {
  title: string
  settings: Settings
  onSettingsChange(settings: Settings): void
}

export interface NetworkSettings {
  ip: string
  port: number
}

export interface Settings {
  network?: NetworkSettings
}
