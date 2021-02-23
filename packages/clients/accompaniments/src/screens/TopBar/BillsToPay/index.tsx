import React, { useCallback } from 'react'
import { MdRefresh } from 'react-icons/md'
import { useDispatch } from 'react-redux'

import { TabOptions, ActionIconButton } from '@shared/web-components'

import { MdFilter } from '~/components/Icons'
import { HomeScreenTabs } from '~/screens/types'
import { loadBillsToPayActionRequest } from '~/store/modules/billsToPay/actions'

const HomeScreenTopBarBillsToPay: React.FC = () => {
  const dispatch = useDispatch()

  const handleRefresh = useCallback(() => {
    dispatch(loadBillsToPayActionRequest())
  }, [dispatch])

  return (
    <TabOptions.Content name={HomeScreenTabs.BILLS_TO_PAY}>
      <ActionIconButton
        icon={<MdFilter />}
        onClick={console.log}
        width={80}
        label="Aplicar Filtro"
      />

      <ActionIconButton
        icon={<MdRefresh />}
        width={85}
        onClick={handleRefresh}
        label="Recarregar Dados"
      />
    </TabOptions.Content>
  )
}

export { HomeScreenTopBarBillsToPay }
