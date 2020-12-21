import React from 'react'

import Head from 'next/head'

import { ReceiptScreen } from '~/screens/Receipt'
import { useReceiptPayload } from '~/windows/receipt/actions'

const Receipt = () => {
  const [filename, url] = useReceiptPayload()

  return (
    <React.Fragment>
      <Head>
        <title>Recibo</title>
      </Head>

      <ReceiptScreen filename={filename} url={url} />
    </React.Fragment>
  )
}

export default Receipt
