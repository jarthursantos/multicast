import React, { useEffect, useRef } from 'react'

import { isEqual, sortBy } from 'lodash'
import moment from 'moment'
import Tabulator, { Formatter } from 'tabulator-tables'
import { ColumnDefinition } from 'tabulator-tables'

import { formatPriceWithoutSymbol } from '@shared/web-components/DataGrid/Body/Row/Cell/Contabil/format'

import { TableProps } from './types'

export const dateColumnOptions: Partial<ColumnDefinition> = {
  sorter: 'datetime',
  sorterParams: {
    format: 'YYYY-MM-DD'
  },
  hozAlign: 'center',
  formatter: 'datetime',
  formatterParams: {
    inputFormat: 'YYYY-MM-DD',
    outputFormat: 'DD/MM/YYYY',
    invalidPlaceholder: '-'
  }
}

const Table: React.VFC<TableProps> = ({
  options,
  dataKey = 'id',
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const tabulator = useRef<Tabulator>(null)

  const { data, columns, initialSort, ...someOptions } = options

  useEffect(() => {
    if (!ref.current) return

    if (!tabulator.current) {
      tabulator.current = new Tabulator(ref.current, someOptions)
      console.log('tabulator:createInstance')
    }
  }, [someOptions])

  useEffect(() => {
    if (!tabulator.current) return

    tabulator.current.setSort(initialSort)
  }, [data, initialSort])

  useEffect(() => {
    if (!tabulator.current || !data) return

    const currentData = tabulator.current.getData() || []

    if (!isEqual(sortBy(currentData, dataKey), sortBy(data, dataKey))) {
      tabulator.current.setData(data)
      console.log('tabulator:updateData', dataKey)
    }
  }, [data, dataKey])

  useEffect(() => {
    if (!tabulator.current || !columns) return

    const currentColumns = tabulator.current.getColumnDefinitions()

    if (!isEqual(sortBy(currentColumns, 'field'), sortBy(columns, 'field'))) {
      tabulator.current.setColumns(columns)
      console.log('tabulator:updateColumns')
    }
  }, [columns])

  useEffect(() => {
    window.moment = moment
  }, [])

  return <div ref={ref} {...props} />
}

export const contabilFormatter: Formatter = cell => {
  const value = formatPriceWithoutSymbol(cell.getValue() || 0)

  return `
    <div style="display: flex; justify-content: space-between;">
      <span>R$ </span>
      <span>${value}</span>
    </div>
  `
}

export const doubleFormatter: Formatter = cell => {
  const value = formatPriceWithoutSymbol(cell.getValue() || 0)

  if (value === '0,00') return ''

  return value
}

export * from './types'
export { Table }
