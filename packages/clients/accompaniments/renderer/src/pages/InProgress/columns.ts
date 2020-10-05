import { useMemo } from 'react'

import { CellType } from '@shared/web-components/DataGrid/Body/Row/Cell/types'
import { ColumnProps } from '@shared/web-components/DataGrid/types'

import {
  useBilledAccompaniments,
  useExpectedBillingAccompaniments,
  useFreeOnBoardAccompaniments,
  useInProgressAccompaniments,
  useNonRevisedAccompaniments,
  useReleasedAccompaniments,
  useRevisedAccompaniments,
  useSchedulingAccompaniments
} from '~/store/context'
import { Accompaniment } from '~/store/modules/accompaniments/types'

export function useAllAccompanimentsData(): ResumeData {
  const accompaniments = useInProgressAccompaniments()

  return useMemo(() => {
    const { inDay, delayed } = calcCounts(accompaniments)

    return [accompaniments, allAccompanimentsColumns, inDay, delayed]
  }, [accompaniments, allAccompanimentsColumns])
}

export function useNonRevisedData(): ResumeData {
  const accompaniments = useNonRevisedAccompaniments()

  const columns = excludeColumns(
    'reviewedAt',
    'releasedAt',
    'expectedBilling',
    'xmlFileAt',
    'invoiceNumber',
    'freeOnBoardAt',
    'schedulingForecastAt'
  )

  return useMemo(() => {
    const { inDay, delayed } = calcCounts(accompaniments)

    return [accompaniments, columns, inDay, delayed]
  }, [accompaniments, columns])
}

export function useRevisedData(): ResumeData {
  const accompaniments = useRevisedAccompaniments()

  const columns = excludeColumns(
    'releasedAt',
    'expectedBilling',
    'xmlFileAt',
    'invoiceNumber',
    'freeOnBoardAt',
    'schedulingForecastAt'
  )

  return useMemo(() => {
    const { inDay, delayed } = calcCounts(accompaniments)

    return [accompaniments, columns, inDay, delayed]
  }, [accompaniments, columns])
}

export function useReleasedData(): ResumeData {
  const accompaniments = useReleasedAccompaniments()

  const columns = excludeColumns(
    'reviewedAt',
    'expectedBilling',
    'xmlFileAt',
    'invoiceNumber',
    'freeOnBoardAt',
    'schedulingForecastAt'
  )

  return useMemo(() => {
    const { inDay, delayed } = calcCounts(accompaniments)

    return [accompaniments, columns, inDay, delayed]
  }, [accompaniments, columns])
}

export function useExpectedBillingData(): ResumeData {
  const accompaniments = useExpectedBillingAccompaniments()

  const columns = excludeColumns(
    'reviewedAt',
    'releasedAt',
    'xmlFileAt',
    'invoiceNumber',
    'freeOnBoardAt',
    'schedulingForecastAt'
  )

  return useMemo(() => {
    const { inDay, delayed } = calcCounts(accompaniments)

    return [accompaniments, columns, inDay, delayed]
  }, [accompaniments, columns])
}

export function useBilledData(): ResumeData {
  const accompaniments = useBilledAccompaniments()

  const columns = excludeColumns(
    'reviewedAt',
    'releasedAt',
    'expectedBilling',
    'invoiceNumber',
    'freeOnBoardAt',
    'schedulingForecastAt'
  )

  return useMemo(() => {
    const { inDay, delayed } = calcCounts(accompaniments)

    return [accompaniments, columns, inDay, delayed]
  }, [accompaniments, columns])
}

export function useFreeOnBoardData(): ResumeData {
  const accompaniments = useFreeOnBoardAccompaniments()

  const columns = excludeColumns(
    'reviewedAt',
    'releasedAt',
    'expectedBilling',
    'xmlFileAt',
    'invoiceNumber',
    'schedulingForecastAt'
  )

  return useMemo(() => {
    const { inDay, delayed } = calcCounts(accompaniments)

    return [accompaniments, columns, inDay, delayed]
  }, [accompaniments, columns])
}

export function useSchedulingData(): ResumeData {
  const accompaniments = useSchedulingAccompaniments()

  const columns = excludeColumns(
    'reviewedAt',
    'releasedAt',
    'expectedBilling',
    'xmlFileAt',
    'invoiceNumber',
    'freeOnBoardAt'
  )

  return useMemo(() => {
    const { inDay, delayed } = calcCounts(accompaniments)

    return [accompaniments, columns, inDay, delayed]
  }, [accompaniments, columns])
}

function calcCounts(accompaniments: Accompaniment[]) {
  return accompaniments.reduce(
    (curr, accompaniment) => {
      if (accompaniment.delay > 2) {
        return { ...curr, delayed: curr.delayed + 1 }
      }

      return { ...curr, inDay: curr.inDay + 1 }
    },
    { inDay: 0, delayed: 0 }
  )
}

function excludeColumns(...paths: string[]): ColumnProps[] {
  return allAccompanimentsColumns.filter(column => {
    const exclude = Boolean(paths.find(path => path === column.cell.path))

    return !exclude
  })
}

export const allAccompanimentsColumns: ColumnProps[] = [
  {
    header: {
      title: 'Nº Pedido',
      width: 80,
      align: 'center'
    },
    cell: {
      type: CellType.NUMBER,
      path: 'purchaseOrder.number'
    },
    footer: {
      value: '10'
    }
  },
  {
    header: {
      title: 'Cód. Fornec.',
      width: 100,
      align: 'center'
    },
    cell: {
      type: CellType.NUMBER,
      path: 'purchaseOrder.provider.code'
    }
  },
  {
    header: {
      title: 'Fornecedor',
      width: 250,
      align: 'left'
    },
    cell: {
      type: CellType.TEXT,
      path: 'purchaseOrder.provider.name'
    }
  },
  {
    header: {
      title: 'Emissão',
      width: 90,
      align: 'center'
    },
    cell: {
      type: CellType.DATE,
      path: 'purchaseOrder.emittedAt'
    }
  },
  {
    header: {
      title: 'Atraso (Dias)',
      width: 110,
      align: 'center'
    },
    cell: {
      type: CellType.NUMBER,
      path: 'delay'
    }
  },
  {
    header: {
      title: 'Marca',
      width: 120,
      align: 'left'
    },
    cell: {
      type: CellType.TEXT,
      path: 'purchaseOrder.provider.fantasy'
    }
  },
  {
    header: {
      title: 'Valor Total',
      width: 120,
      align: 'center'
    },
    cell: {
      type: CellType.CONTABIL,
      path: 'purchaseOrder.amountValue'
    },
    footer: {
      value: 'R$ 1.000,00',
      type: 'contabil'
    }
  },
  {
    header: {
      title: 'Comprador',
      width: 200,
      align: 'left'
    },
    cell: {
      type: CellType.TEXT,
      path: 'purchaseOrder.buyer.name'
    }
  },
  {
    header: {
      title: 'Transportadora',
      width: 200,
      align: 'left'
    },
    cell: {
      type: CellType.TEXT,
      path: 'code'
    }
  },
  {
    header: {
      title: 'Frete',
      width: 80,
      align: 'center'
    },
    cell: {
      type: CellType.TEXT,
      path: 'purchaseOrder.freight',
      align: 'center'
    }
  },
  {
    header: {
      title: 'Representante',
      width: 200,
      align: 'left'
    },
    cell: {
      type: CellType.TEXT,
      path: 'purchaseOrder.provider.representative.name'
    }
  },
  {
    header: {
      title: 'Revisão',
      width: 100,
      align: 'center'
    },
    cell: {
      type: CellType.DATE,
      path: 'reviewedAt'
    }
  },
  {
    header: {
      title: 'Liberação',
      width: 100,
      align: 'center'
    },
    cell: {
      type: CellType.DATE,
      path: 'releasedAt'
    }
  },
  {
    header: {
      title: 'Prev. Faturamento',
      width: 140,
      align: 'center'
    },
    cell: {
      type: CellType.DATE,
      path: 'expectedBilling'
    }
  },
  {
    header: {
      title: 'Arq. XML',
      width: 100,
      align: 'center'
    },
    cell: {
      type: CellType.DATE,
      path: 'xmlFileAt'
    }
  },
  {
    header: {
      title: 'Nº Nota Fiscal',
      width: 110,
      align: 'center'
    },
    cell: {
      type: CellType.NUMBER,
      path: 'invoiceNumber'
    }
  },
  {
    header: {
      title: 'FOB SP',
      width: 100,
      align: 'center'
    },
    cell: {
      type: CellType.DATE,
      path: 'freeOnBoardAt'
    }
  },
  {
    header: {
      title: 'Prev. Agendamento',
      width: 140,
      align: 'center'
    },
    cell: {
      type: CellType.DATE,
      path: 'schedulingForecastAt'
    }
  }
]

export type ResumeData = [Accompaniment[], ColumnProps[], number, number]
