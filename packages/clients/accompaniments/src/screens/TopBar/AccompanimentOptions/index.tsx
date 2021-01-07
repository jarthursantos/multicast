import React, { useCallback, useContext } from 'react'
import { MdDashboard, MdRefresh } from 'react-icons/md'
import { useDispatch } from 'react-redux'

import {
  TabOptions,
  ButtonGroup,
  ActionIconButton
} from '@shared/web-components'

import { MdFilter, MdPendingAction, MdReceiptLong } from '~/components/Icons'
import { HomeScreenContext } from '~/screens/context'
import { HomeScreenTabs, AccompanimentTabs } from '~/screens/types'
import { useTypedSelector } from '~/store'
import { loadAccompanimentsRequest } from '~/store/modules/accompaniments/actions'
import { openAccompanimentFilters } from '~/windows/AccompanimentFilters/action'

const HomeScreenTopBarAccompanimentOptions: React.VFC = () => {
  const dispatch = useDispatch()

  const { filters } = useTypedSelector(state => state.accompaniments)
  const { token } = useTypedSelector(state => state.auth)

  const { currentAccompanimentTab, changeAccompanimentTab } = useContext(
    HomeScreenContext
  )

  const handleFilter = useCallback(() => {
    openAccompanimentFilters(filters, token)
  }, [filters, token])

  const handleRefresh = useCallback(() => {
    dispatch(loadAccompanimentsRequest())
  }, [dispatch])

  return (
    <TabOptions.Content name={HomeScreenTabs.ACCOMPANIMENTS}>
      <ButtonGroup
        currentButton={currentAccompanimentTab}
        onSelectionChange={changeAccompanimentTab}
      >
        <ButtonGroup.Button
          name={AccompanimentTabs.GENERAL_RESUME}
          label="Resumo Geral"
          icon={<MdDashboard />}
          width={85}
        />

        <ButtonGroup.Button
          name={AccompanimentTabs.IN_PROGRESS}
          label="Em Andamento"
          icon={<MdPendingAction />}
          width={95}
        />

        <ButtonGroup.Button
          name={AccompanimentTabs.IN_RECEIVEMENT}
          label="Em Recebimento"
          icon={<MdReceiptLong />}
          width={105}
        />
      </ButtonGroup>

      <TabOptions.Content.Separator />

      <ActionIconButton
        icon={<MdFilter />}
        onClick={handleFilter}
        width={80}
        label="Aplicar Filtro"
      />

      <ActionIconButton
        icon={<MdRefresh />}
        onClick={handleRefresh}
        width={85}
        label="Recarregar Dados"
      />
    </TabOptions.Content>
  )
}

export { HomeScreenTopBarAccompanimentOptions }
