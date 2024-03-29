import React, { useCallback, useContext } from 'react'
import { MdDashboard, MdRefresh, MdCancel, MdCheckCircle } from 'react-icons/md'
import { useDispatch } from 'react-redux'

import {
  TabOptions,
  ButtonGroup,
  ActionIconButton
} from '@shared/web-components'

import { MdFilter, MdPendingAction, MdReceiptLong } from '~/components/Icons'
import { HomeScreenContext } from '~/screens/context'
import { HomeScreenTabs, AccompanimentTabs } from '~/screens/types'
import { loadAccompanimentsRequest } from '~/store/modules/accompaniments/actions'
import { openAccompanimentFilters } from '~/windows/AccompanimentFilters/action'

const HomeScreenTopBarAccompaniment: React.VFC = () => {
  const dispatch = useDispatch()

  const { currentAccompanimentTab, changeAccompanimentTab } = useContext(
    HomeScreenContext
  )

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

        <TabOptions.Content.Separator />

        <ActionIconButton
          icon={<MdFilter />}
          onClick={openAccompanimentFilters}
          width={80}
          label="Aplicar Filtro"
        />

        <ActionIconButton
          icon={<MdRefresh />}
          onClick={handleRefresh}
          width={85}
          label="Recarregar Dados"
        />

        <TabOptions.Content.Separator />

        <ButtonGroup.Button
          name={AccompanimentTabs.CENCELED}
          label="Pedidos Cancelados"
          icon={<MdCancel />}
          width={95}
        />

        <ButtonGroup.Button
          name={AccompanimentTabs.COMPLETED}
          label="Pedidos Concluidos"
          icon={<MdCheckCircle />}
          width={105}
        />
      </ButtonGroup>
    </TabOptions.Content>
  )
}

export { HomeScreenTopBarAccompaniment }
