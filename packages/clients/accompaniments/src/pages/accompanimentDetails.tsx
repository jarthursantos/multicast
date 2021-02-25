import React from 'react'

import Head from 'next/head'

import { useCloseWindow } from '~/hooks/use-close-window'
import { useSetupAuth } from '~/hooks/use-setup-auth'
import { AccompanimentDetailsScreen } from '~/screens/AccompanimentDetails'
import { useAccompanimentDetailsPayload } from '~/windows/AccompanimentDetails/actions'

const Home = () => {
  const [accompaniment, token] = useAccompanimentDetailsPayload()

  useSetupAuth(token)
  useCloseWindow()

  return (
    <React.Fragment>
      <Head>
        <title>FollowUP Compras - Acompanhamento</title>
      </Head>

      <AccompanimentDetailsScreen accompaniment={accompaniment} />
    </React.Fragment>
  )
}

export default Home
