import React from 'react'

import Head from 'next/head'

import { useCloseWindow } from '~/hooks/use-close-window'

const DischargeCostsTable = () => {
  useCloseWindow()

  return (
    <React.Fragment>
      <Head>
        <title>Tabela de Descarrego</title>
      </Head>

      <h1>Tabela de Descarrego</h1>
    </React.Fragment>
  )
}

export default DischargeCostsTable
