import React, { useCallback, useRef } from 'react'
import { MdRefresh } from 'react-icons/md'

import { TabOptions, ActionIconButton } from '@shared/web-components'

import { MdFilter } from '~/components/Icons'
import { HomeScreenTabs } from '~/screens/types'

import { BillsToPayFilter, BillsToPayFilterHandles } from './FilterDialog'

const HomeScreenTopBarBillsToPay: React.FC = () => {
  const filterRef = useRef<BillsToPayFilterHandles>(null)
  const filterButtonRef = useRef<HTMLDivElement>(null)

  const handleFilter = useCallback(() => {
    filterRef.current?.open(filterButtonRef.current.getBoundingClientRect())
  }, [filterRef, filterButtonRef])

  return (
    <React.Fragment>
      <TabOptions.Content name={HomeScreenTabs.BILLS_TO_PAY}>
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
          width={85}
          label="Recarregar Dados"
        />
      </TabOptions.Content>

      <BillsToPayFilter ref={filterRef} />
    </React.Fragment>
  )
}

export { HomeScreenTopBarBillsToPay }
