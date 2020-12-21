import React from 'react'

import Head from 'next/head'

import { useCloseWindow } from '~/hooks/use-close-window'
import { useSetupAuth } from '~/hooks/use-setup-auth'
import { ReadonlyScheduleScreen } from '~/screens/Schedule/Readonly'
import { useReadonlySchedulePayload } from '~/windows/schedule/readonly/actions'

const ReadonlySchedule = () => {
  const [schedule, token] = useReadonlySchedulePayload()

  useSetupAuth(token)
  useCloseWindow()

  return (
    <React.Fragment>
      <Head>
        <title>Agendamento {schedule?.shippingName.toUpperCase()}</title>
      </Head>

      <ReadonlyScheduleScreen schedule={schedule} />
    </React.Fragment>
  )
}

export default ReadonlySchedule
