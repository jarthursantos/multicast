import React from 'react'

import Head from 'next/head'

import { useCloseWindow } from '~/hooks/use-close-window'
import Accompaniment from '~/pages/Accompaniment'

const Next = () => {
  useCloseWindow()

  return (
    <React.Fragment>
      <Head>
        <title>FollowUP Compras - Acompanhamento</title>
      </Head>

      <Accompaniment />
    </React.Fragment>
  )
}

export default Next
