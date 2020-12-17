import React from 'react'

import Head from 'next/head'

import { useSetupAuth } from '~/hooks/use-setup-auth'
import { ReadonlyInvoiceScreen } from '~/screens/Invoice/Readonly'
import { useInvoiceReadonlyModePayload } from '~/windows/invoice/readonly/actions'

const Readonly = () => {
  const [invoice, token] = useInvoiceReadonlyModePayload()

  useSetupAuth(token)

  return (
    <React.Fragment>
      <Head>
        <title>Nota Fiscal {invoice && invoice.number}</title>
      </Head>

      <ReadonlyInvoiceScreen invoice={invoice} />
    </React.Fragment>
  )
}

export default Readonly
