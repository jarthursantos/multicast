import React, { useCallback, useEffect, useRef } from 'react'
import { MdRefresh, MdAddCircleOutline } from 'react-icons/md'
import { useDispatch } from 'react-redux'

import { TabOptions, ActionIconButton } from '@shared/web-components'

import { MdFilter } from '~/components/Icons'
import { HomeScreenTabs } from '~/screens/types'
import { loadAgendaRequest } from '~/store/modules/agenda/actions'
import { openCreateSchedule } from '~/windows/CreateSchedule/action'

import { ScheduleFilter, ScheduleFilterHandles } from './FilterDialog'

const HomeScreenTopBarScheduleOptions: React.FC = () => {
  const dispatch = useDispatch()

  const filterRef = useRef<ScheduleFilterHandles>(null)
  const filterButtonRef = useRef<HTMLDivElement>(null)

  const handleFilter = useCallback(() => {
    filterRef.current?.open(filterButtonRef.current.getBoundingClientRect())
  }, [filterRef, filterButtonRef])

  const handleRefresh = useCallback(() => {
    dispatch(loadAgendaRequest())
  }, [dispatch])

  useEffect(handleRefresh, [handleRefresh])

  return (
    <React.Fragment>
      <TabOptions.Content name={HomeScreenTabs.SCHEDULES}>
        <ActionIconButton
          icon={<MdAddCircleOutline />}
          onClick={openCreateSchedule}
          width={80}
          label="Adicionar"
        />

        <TabOptions.Content.Separator />

        <div ref={filterButtonRef}>
          <ActionIconButton
            icon={<MdFilter />}
            onClick={handleFilter}
            width={80}
            label="Aplicar Filtro"
          />
        </div>

        <ActionIconButton
          icon={<MdRefresh />}
          onClick={handleRefresh}
          width={85}
          label="Recarregar Dados"
        />
      </TabOptions.Content>

      <ScheduleFilter ref={filterRef} />
    </React.Fragment>
  )
}

export { HomeScreenTopBarScheduleOptions }
