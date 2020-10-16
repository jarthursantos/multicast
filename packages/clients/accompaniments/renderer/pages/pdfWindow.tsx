import React from 'react'

import Head from 'next/head'

import { useCloseWindow } from '~/hooks/use-close-window'
import PDFWindow from '~/pages/PDFWindow'

const Next = () => {
  useCloseWindow()

  return (
    <React.Fragment>
      <Head>
        <title>FollowUP Compras - PDF</title>
      </Head>

      <PDFWindow />
    </React.Fragment>
  )
}

export default Next
