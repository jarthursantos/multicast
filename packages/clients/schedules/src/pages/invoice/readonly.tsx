import React from 'react'

import Head from 'next/head'

import { useCloseWindow } from '~/hooks/use-close-window'
import { useSetupAuth } from '~/hooks/use-setup-auth'
import { ReadonlyInvoiceScreen } from '~/screens/Invoice/Readonly'
import { useInvoiceReadonlyModePayload } from '~/windows/invoice/readonly/actions'

const Readonly = () => {
  const [schedule, invoice, token] = useInvoiceReadonlyModePayload()

  useSetupAuth(token)
  useCloseWindow()

  return (
    <React.Fragment>
      <Head>
        <title>Nota Fiscal {invoice && invoice.number}</title>
      </Head>

      <ReadonlyInvoiceScreen schedule={schedule} invoice={invoice} />
    </React.Fragment>
  )
}

export default Readonly
