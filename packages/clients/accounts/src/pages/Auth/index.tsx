import React from 'react'

import { Page } from '@shared/web-components'
import { AuthPage } from '@shared/web-pages'

import { version } from '../../../package.json'

const Auth: React.FC = () => {
  return (
    <Page title="Entrar">
      <AuthPage version={version} />
    </Page>
  )
}

export default Auth
