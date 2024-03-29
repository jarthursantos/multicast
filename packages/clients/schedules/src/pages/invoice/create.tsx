import React from 'react'

import Head from 'next/head'

import { useCloseWindow } from '~/hooks/use-close-window'
import { useSetupAuth } from '~/hooks/use-setup-auth'
import { CreateInvoiceScreen } from '~/screens/Invoice/Create'
import { useCreateInvoicePayload } from '~/windows/invoice/create/actions'

const Create = () => {
  const [schedule, token] = useCreateInvoicePayload()

  useSetupAuth(token)
  useCloseWindow()

  return (
    <React.Fragment>
      <Head>
        <title>Adicionar Nota Fiscal</title>
      </Head>

      <CreateInvoiceScreen schedule={schedule} />
    </React.Fragment>
  )
}

export default Create
