import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'

import { FooterCellProps } from './Footer/Cell/types'
import { DataGridProps, ContextHandles } from './types'

type Props<Data> = Omit<DataGridProps<Data>, 'style'>

const GridContext = createContext<ContextHandles>(null)

export function GridContextProvider<Data>({
  children,
  columns,
  keyExtractor,
  data,
  onRowClick,
  onRowDoubleClick,
  onSelectionChange,
  resolveRowStyle
}: Props<Data> & { children: ReactNode }) {
  const [selectedRow, setSelectedRow] = useState<Data>()

  const selectedRowId = useMemo(
    () => keyExtractor && selectedRow && keyExtractor(selectedRow),
    [selectedRow, keyExtractor]
  )

  const handleRowClick = useCallback(
    (data: any) => {
      setSelectedRow(data)

      onRowClick && onRowClick(data)
    },
    [onRowClick, keyExtractor]
  )

  useEffect(() => {
    if (!onSelectionChange) return

    onSelectionChange(selectedRow)
  }, [onSelectionChange, selectedRow])

  return (
    <GridContext.Provider
      value={{
        resolveRowStyle,
        columns,
        keyExtractor,
        data,
        onRowClick: handleRowClick,
        onRowDoubleClick,
        selectedRow: selectedRowId
      }}
    >
      {children}
    </GridContext.Provider>
  )
}

export function useColumnsFooter(): Array<FooterCellProps & { key: string }> {
  const { columns } = useContext(GridContext)

  return columns.map(({ footer, header }) => ({ ...footer, key: header.title }))
}

export function useColumnsHeader() {
  const { columns } = useContext(GridContext)

  return columns.map(column => column.header)
}

export function useColumnsCell() {
  const { columns } = useContext(GridContext)

  return columns.map(column => column.cell)
}

export function useSelectedRow() {
  const { selectedRow } = useContext(GridContext)

  return selectedRow
}

export function useRowStyle<Data>(item: Data) {
  const { resolveRowStyle } = useContext(GridContext)

  if (!resolveRowStyle) {
    return undefined
  }

  return resolveRowStyle(item)
}

export function useSortedData<Data>(): Data[] {
  const { data } = useContext(GridContext)

  return data
}

export function useKeyExtractor() {
  const { keyExtractor } = useContext(GridContext)

  return keyExtractor
}

export function useRowWidth() {
  const columns = useColumnsHeader()

  const width = useMemo(() => {
    return columns.reduce((old, { width }) => old + width, 0)
  }, [columns])

  return width
}

export function useRowClick(data: any) {
  const { onRowClick } = useContext(GridContext)

  return useCallback(() => onRowClick && onRowClick(data), [onRowClick, data])
}

export function useRowDoubleClick(data: any) {
  const { onRowDoubleClick } = useContext(GridContext)

  return useCallback(() => onRowDoubleClick && onRowDoubleClick(data), [
    onRowDoubleClick,
    data
  ])
}
