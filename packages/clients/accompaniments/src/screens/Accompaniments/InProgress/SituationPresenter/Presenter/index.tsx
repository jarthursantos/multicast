import React, { useMemo, useState } from 'react'

import { cloneDeep } from 'lodash'

import { ProductsContainer } from '~/components/ProductsContainer'
import {
  Container,
  TableWrapper
} from '~/screens/Accompaniments/InProgress/SituationPresenter/Presenter/styles'
import { InProgressSituationTable } from '~/screens/Accompaniments/InProgress/SituationTable'
import { InProgressSituationTableProps } from '~/screens/Accompaniments/InProgress/SituationTable/types'
import { Accompaniment } from '~/store/modules/accompaniments/types'

type Props = Omit<InProgressSituationTableProps, 'onSelectionChange'>

const Presenter: React.VFC<Props> = ({ data, columns, tab }) => {
  const [productsWidth, setProductsWidth] = useState(300)
  const [selectedRow, setSelectedRow] = useState<Accompaniment>()

  const accompaniments = useMemo(() => data.map(cloneDeep), [data])

  return (
    <Container productsWidth={productsWidth}>
      <TableWrapper>
        <InProgressSituationTable
          data={accompaniments}
          columns={columns}
          tab={tab}
          onSelectionChange={setSelectedRow}
        />
      </TableWrapper>

      <ProductsContainer
        accompanimentId={selectedRow?.id}
        onResize={setProductsWidth}
      />
    </Container>
  )
}

export { Presenter }
