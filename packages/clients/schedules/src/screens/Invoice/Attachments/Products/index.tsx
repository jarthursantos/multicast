import React, { useState, useEffect, useContext } from 'react'

import { remote } from 'electron'

import { api, AxiosContext, extractErrorMessage } from '@shared/axios'

import { doubleFormatter, Table } from '~/components/Table'
import { IInvoiceProduct } from '~/store/modules/schedules/types'

import { IInvoiceProductsProps } from './types'

const InvoiceProducts: React.VFC<IInvoiceProductsProps> = ({ invoice }) => {
  const { token } = useContext(AxiosContext)
  const [products, setProducts] = useState<IInvoiceProduct[]>([])

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await api.get<IInvoiceProduct[]>(
          `invoices/${invoice.id}/products`,
          {
            headers: {
              Authorization: 'Bearer ' + token
            }
          }
        )

        setProducts(response.data)
      } catch (error) {
        const message = extractErrorMessage(error)

        remote.dialog.showErrorBox('Erro ao carregar produtos', message)
      }
    }

    loadProducts()
  }, [invoice, token])

  return (
    <Table
      options={{
        data: products,
        layout: 'fitColumns',
        resizableColumns: false,
        columns: [
          {
            title: 'Código',
            field: 'code',
            width: 100,
            sorter: 'number',
            hozAlign: 'right',
            bottomCalc: 'count'
          },
          {
            title: 'Descrição',
            widthGrow: 1,
            widthShrink: 1,
            field: 'description'
          },
          {
            title: 'Quantidade',
            width: 140,
            field: 'quantity',
            hozAlign: 'right',
            sorter: 'number',
            formatter: doubleFormatter,
            bottomCalc: 'sum',
            bottomCalcFormatter: doubleFormatter
          }
        ],
        height: 541
      }}
    />
  )
}

export { InvoiceProducts }
