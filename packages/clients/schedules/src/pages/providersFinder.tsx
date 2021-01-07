import React from 'react'

import Head from 'next/head'

import { ProviderFinderScreen } from '@shared/web-components/Form/Inputs/ProviderInput/Finder'

const ProviderFinder = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Localizar Fornecedor</title>
      </Head>

      <ProviderFinderScreen />
    </React.Fragment>
  )
}

export default ProviderFinder
