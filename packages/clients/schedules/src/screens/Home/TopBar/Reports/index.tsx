import React, { useContext } from 'react'
import { MdAccountBalanceWallet } from 'react-icons/md'

import { TabOptions, ButtonGroup } from '@shared/web-components'

import { MdPendingAction } from '~/components/Icons/PendingAction'
import { HomeScreenContext } from '~/screens/Home/context'
import { HomeScreenTabs, ReportsTabs } from '~/screens/Home/types'

const HomeScreenTopBarReportsOptions: React.VFC = () => {
  const { changeReportTab, currentReportTab } = useContext(HomeScreenContext)

  return (
    <TabOptions.Content name={HomeScreenTabs.REPORTS}>
      <ButtonGroup
        currentButton={currentReportTab}
        onSelectionChange={changeReportTab}
      >
        <ButtonGroup.Button
          name={ReportsTabs.DISCHARGE_VALUE}
          label="Relatório de Custos"
          icon={<MdAccountBalanceWallet />}
          width={95}
        />

        <ButtonGroup.Button
          name={ReportsTabs.PENDING_PROCCESS}
          label="Processos Pendentes"
          icon={<MdPendingAction />}
          width={95}
        />
      </ButtonGroup>
    </TabOptions.Content>
  )
}

export { HomeScreenTopBarReportsOptions }
