import React, { useEffect, useState, useMemo } from 'react'
import { useDispatch } from 'react-redux'

import { cloneDeep } from 'lodash'

import { LoadingPanel } from '@shared/web-components'
import { Table } from '@shared/web-components/Table'

import { ProductsContainer } from '~/components/ProductsContainer'
import { useTypedSelector } from '~/store'
import { loadCanceledAccompanimentsRequest } from '~/store/modules/accompaniments/actions'
import { Accompaniment } from '~/store/modules/accompaniments/types'
import { openAccompanimentDetails } from '~/windows/AccompanimentDetails/actions'

import { columns } from './columns'
import { Container, TableWrapper, IncludeMessageContainer } from './styles'

const AccompanimentsCanceled: React.VFC = () => {
  const dispatch = useDispatch()

  const [productsWidth, setProductsWidth] = useState(300)
  const [selectedRow, setSelectedRow] = useState<Accompaniment>()

  const {
    canceledAccompaniments,
    includeCanceledAccompaniments,
    loadingCanceledAccompaniments,
    filters
  } = useTypedSelector(state => state.accompaniments)

  const data = useMemo(() => cloneDeep(canceledAccompaniments), [
    canceledAccompaniments
  ])

  useEffect(() => {
    if (includeCanceledAccompaniments) {
      dispatch(loadCanceledAccompanimentsRequest(filters))
    }
  }, [includeCanceledAccompaniments, dispatch, filters])

  return (
    <>
      <Container productsWidth={productsWidth}>
        <TableWrapper>
          <Table
            options={{
              data,
              columns,
              selectable: 1,
              layout: 'fitDataFill',
              headerHozAlign: 'center',
              movableColumns: true,
              headerSortTristate: true,
              initialSort: [{ column: 'delay', dir: 'desc' }],
              persistenceID: 'canceled',
              persistence: {
                columns: true,
                sort: true
              },
              rowClick: (_, row) => {
                if (!row || !row.select) return

                row?.select()
              },
              rowSelectionChanged: ([accompaniment]: Accompaniment[]) => {
                setSelectedRow(accompaniment)
              },
              rowDblClick: (_, row) => {
                if (!row || !row.select) return

                row?.select()

                openAccompanimentDetails(row.getData())
              },
              rowFormatter: row => {
                const accompaniment: Accompaniment = row.getData()

                if (accompaniment.purchaseOrder.isBonification) {
                  row.getElement().style.color = 'blue'
                }

                if (accompaniment.isOutstanding) {
                  row.getElement().style.fontWeight = 'bold'
                }
              }
            }}
          />
        </TableWrapper>

        <ProductsContainer
          isExpanded
          accompanimentId={selectedRow?.id}
          onResize={setProductsWidth}
        />
      </Container>

      <LoadingPanel isLoading={loadingCanceledAccompaniments} />

      {!loadingCanceledAccompaniments && !includeCanceledAccompaniments && (
        <IncludeMessageContainer>
          Aplique um filtro com a opção
          <strong>&nbsp;&quot;Buscar Pedidos Cancelados&quot;&nbsp;</strong>
          marcada para ver os dados
        </IncludeMessageContainer>
      )}
    </>
  )
}

export { AccompanimentsCanceled }
