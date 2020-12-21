import React, { useCallback, useContext } from 'react'
import {
  MdRefresh,
  MdAssignmentLate,
  MdAssignmentTurnedIn
  // MdAttachMoney
} from 'react-icons/md'
import { useDispatch } from 'react-redux'

import { TabOptions, ActionIconButton } from '@shared/web-components'
// import { Roles } from '@shared/web-pages'

import { MdFilter } from '~/components/Icons/Filter'
import { HomeScreenTabs } from '~/screens/Home/types'
// import { useTypedSelector } from '~/store'
import { loadScheduleRequestRequest } from '~/store/modules/schedule-requests/actions'
import { loadSchedulesRequest } from '~/store/modules/schedules/actions'
// import { openDischargeCostsTableWindow } from '~/windows/discharge-costs-table/actions'
import { openFiltersWindow } from '~/windows/filters/actions'
import { openCreateScheduleRequestWindow } from '~/windows/schedule-request/create/actions'
import { openCreateScheduleWindow } from '~/windows/schedule/create/actions'

import { HomeScreenContext } from '../../context'

const HomeScreenTopBarSchedulesOptions: React.FC = () => {
  const dispatch = useDispatch()

  const { isLoadingData } = useContext(HomeScreenContext)

  // const { user } = useTypedSelector(state => state.auth)

  const handleRefresh = useCallback(() => {
    dispatch(loadSchedulesRequest())
    dispatch(loadScheduleRequestRequest())
  }, [dispatch])

  return (
    <TabOptions.Content name={HomeScreenTabs.SCHEDULES}>
      <ActionIconButton
        icon={<MdAssignmentLate />}
        onClick={openCreateScheduleRequestWindow}
        width={100}
        label="Adicionar Pré Agendamento"
      />

      <ActionIconButton
        icon={<MdAssignmentTurnedIn />}
        onClick={openCreateScheduleWindow}
        width={100}
        label="Adicionar Agendamento"
      />

      <TabOptions.Content.Separator />

      <ActionIconButton
        icon={<MdRefresh />}
        onClick={handleRefresh}
        width={85}
        disabled={isLoadingData}
        label="Recarregar Dados"
      />

      <ActionIconButton
        icon={<MdFilter />}
        onClick={openFiltersWindow}
        width={85}
        label="Filtar Dados"
      />

      {/* {user?.role === Roles.ADMIN && (
        <>
          <TabOptions.Content.Separator />

          <ActionIconButton
            icon={<MdAttachMoney />}
            onClick={openDischargeCostsTableWindow}
            width={95}
            label="Tabela de Custos"
          />
        </>
      )} */}
    </TabOptions.Content>
  )
}

export { HomeScreenTopBarSchedulesOptions }
