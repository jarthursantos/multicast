import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo
} from 'react'

import { FooterCellProps } from './Footer/Cell/types'
import { DataGridProps, ContextHandles } from './types'

type Props<Data> = Omit<DataGridProps<Data>, 'style'>

const GridContext = createContext<ContextHandles>(null)

export function GridContextProvider<Data>({
  children,
  columns,
  keyBinding,
  data
}: Props<Data> & { children: ReactNode }) {
  const resolveRowStyle = useCallback((item: Data) => {
    console.log({ item })

    return {}
  }, [])

  const handles = useMemo<ContextHandles>(
    () => ({
      resolveRowStyle,
      columns,
      keyBinding,
      data
    }),
    [resolveRowStyle, columns]
  )

  return <GridContext.Provider value={handles}>{children}</GridContext.Provider>
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

export function useRowStyle<Data>(item: Data) {
  const { resolveRowStyle } = useContext(GridContext)

  return resolveRowStyle(item)
}

export function useSortedData<Data>(): Data[] {
  const { data } = useContext(GridContext)

  return data
}

export function useKeybinding() {
  const { keyBinding } = useContext(GridContext)

  return keyBinding
}

export function useRowWidth() {
  const columns = useColumnsHeader()

  const width = useMemo(() => {
    return columns.reduce((old, { width }) => old + width, 0)
  }, [columns])

  return width
}
