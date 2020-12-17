import React from 'react'
import { ToastContainer, Slide } from 'react-toastify'

import Head from 'next/head'

import { HomeScreen } from '~/screens/Home'

const Home = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Agendamentos</title>
      </Head>

      <HomeScreen />

      <ToastContainer
        position="bottom-center"
        pauseOnFocusLoss={false}
        closeButton={false}
        autoClose={3000}
        transition={Slide}
        style={{ marginBottom: -24 }}
        newestOnTop
      />
    </React.Fragment>
  )
}

export default Home
