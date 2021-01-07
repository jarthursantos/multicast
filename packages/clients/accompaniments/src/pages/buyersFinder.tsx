import React from 'react'

import Head from 'next/head'

import { BuyerFinderScreen } from '@shared/web-components/Form/Inputs/BuyerInput/Finder'

const BuyerFinder = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Localizar Comprador</title>
      </Head>

      <BuyerFinderScreen />
    </React.Fragment>
  )
}

export default BuyerFinder
