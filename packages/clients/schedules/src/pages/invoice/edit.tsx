import React from 'react'

import Head from 'next/head'

import { useCloseWindow } from '~/hooks/use-close-window'
import { useSetupAuth } from '~/hooks/use-setup-auth'
import { EditInvoiceScreen } from '~/screens/Invoice/Edit'
import { useInvoiceEditModePayload } from '~/windows/invoice/edit/actions'

const Edit = () => {
  const [schedule, invoice, token] = useInvoiceEditModePayload()

  useSetupAuth(token)
  useCloseWindow()

  return (
    <React.Fragment>
      <Head>
        <title>Editar Nota Fiscal {invoice && invoice.number}</title>
      </Head>

      <EditInvoiceScreen schedule={schedule} invoice={invoice} />
    </React.Fragment>
  )
}

export default Edit
