import React from 'react'

import Head from 'next/head'

import { HomeScreen } from '~/screens/Home'

const Home = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Agendamentos</title>
      </Head>

      <HomeScreen />
    </React.Fragment>
  )
}

export default Home
