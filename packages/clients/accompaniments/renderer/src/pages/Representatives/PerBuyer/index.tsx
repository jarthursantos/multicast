import React, { useEffect, useState } from 'react'

import { DataGrid, SplitContainer } from '@shared/web-components'

import { useRepresentativesPerBuyer } from '../context'
import { Representative, BuyerRepresentativeGroup } from '../types'
import { buyerColumns, representativesColumns } from './columns'

const PerBuyer: React.FC = () => {
  const data = useRepresentativesPerBuyer()

  const [selection, setSelection] = useState<BuyerRepresentativeGroup>()
  const [representatives, setRepresentatives] = useState<Representative[]>([])

  useEffect(() => {
    if (!selection) {
      return
    }

    setRepresentatives(selection.representatives)
  }, [selection])

  return (
    <SplitContainer resizeLocation="left" resizeWidth={300}>
      <DataGrid<BuyerRepresentativeGroup>
        keyExtractor={obj => `${obj.code}`}
        data={data}
        onRowClick={setSelection}
        columns={buyerColumns}
        resolveRowStyle={() => ({})}
      />

      <DataGrid<Representative>
        keyExtractor={obj => `${obj.provider.code}`}
        data={representatives}
        columns={representativesColumns}
        resolveRowStyle={() => ({})}
      />
    </SplitContainer>
  )
}

export default PerBuyer
