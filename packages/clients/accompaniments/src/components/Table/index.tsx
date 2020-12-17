import React, { useEffect, useRef } from 'react'

import { isEqual, sortBy } from 'lodash'
import moment from 'moment'
import Tabulator, { Formatter } from 'tabulator-tables'

import { formatPriceWithoutSymbol } from '@shared/web-components/DataGrid/Body/Row/Cell/Contabil/format'

import { TableProps } from './types'

const Table: React.VFC<TableProps> = ({ options, ...props }) => {
  const ref = useRef<HTMLDivElement>(null)
  const tabulator = useRef<Tabulator>(null)

  const { data, columns, ...someOptions } = options

  useEffect(() => {
    if (!ref.current) return

    if (!tabulator.current) {
      tabulator.current = new Tabulator(ref.current, someOptions)
    }
  }, [someOptions])

  useEffect(() => {
    if (!tabulator.current || !data) return

    const currentColumns = tabulator.current.getData()

    if (!isEqual(sortBy(currentColumns), sortBy(data))) {
      tabulator.current.setData(data)
    }
  }, [data])

  useEffect(() => {
    if (!tabulator.current || !columns) return

    const currentColumns = tabulator.current.getColumnDefinitions()

    if (!isEqual(sortBy(currentColumns, 'field'), sortBy(columns, 'field'))) {
      tabulator.current.setColumns(columns)
    }
  }, [columns])

  useEffect(() => {
    window.moment = moment
  }, [])

  return <div ref={ref} {...props} />
}

export const contabilFormatter: Formatter = cell => {
  return `
    <div style="display: flex; justify-content: space-between;">
      <span>R$ </span>
      <span>${formatPriceWithoutSymbol(cell.getValue())}</span>
    </div>
  `
}

export * from './types'
export { Table }
