import React from 'react'

import Head from 'next/head'

import { useCloseWindow } from '~/hooks/use-close-window'
import { AccompanimentDetailsScreen } from '~/screens/AccompanimentDetails'

const Home = () => {
  useCloseWindow()

  return (
    <React.Fragment>
      <Head>
        <title>FollowUP Compras - Acompanhamento</title>
      </Head>

      <AccompanimentDetailsScreen />
    </React.Fragment>
  )
}

export default Home
