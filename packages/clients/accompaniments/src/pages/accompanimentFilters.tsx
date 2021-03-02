import React from 'react'

import Head from 'next/head'

import { useSetupAuth } from '~/hooks/use-setup-auth'
import { AccompanimentsFilterScreen } from '~/screens/AccompanimentsFilter'
import { useAccompanimentFilters } from '~/windows/AccompanimentFilters/action'

const Home = () => {
  const [
    filters,
    includeCanceledAccompaniments,
    includeCompletedAccompaniments,
    token
  ] = useAccompanimentFilters()

  useSetupAuth(token)

  return (
    <React.Fragment>
      <Head>
        <title>FollowUP Compras - Acompanhamento - Filtros</title>
      </Head>

      <AccompanimentsFilterScreen
        {...{
          filters,
          includeCanceledAccompaniments,
          includeCompletedAccompaniments
        }}
      />
    </React.Fragment>
  )
}

export default Home
