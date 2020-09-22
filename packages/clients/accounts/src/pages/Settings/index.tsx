import React, { useCallback, useState } from 'react'

import { SettingsPage, Settings as SettingsData } from '@shared/web-pages'

const Settings: React.FC = () => {
  const [settings, setSettings] = useState<SettingsData>({})

  const handleSaveSettings = useCallback((updatedSettings: SettingsData) => {
    setSettings(updatedSettings)
    console.log({ settings })
  }, [])

  return (
    <SettingsPage
      settings={settings}
      title="Usuários & Permissões"
      onSettingsChange={handleSaveSettings}
    />
  )
}

export default Settings
