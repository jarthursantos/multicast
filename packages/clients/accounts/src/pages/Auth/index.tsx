import React from 'react'

import { AuthPage } from '@shared/web-pages'

import { version } from '~/../package.json'
import icon from '~/assets/icon.ico'

const Auth: React.FC = () => {
  return (
    <AuthPage
      icon={icon}
      title="Usuários & Permissões"
      version={version}
      onLogInSuccess={console.log}
    />
  )
}

export default Auth
