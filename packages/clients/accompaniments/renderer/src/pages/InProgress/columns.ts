import { useMemo } from 'react'

import { formatPrice } from '@shared/web-components/DataGrid/Body/Row/Cell/Contabil/format'
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
  const columns = getAllAccompanimentColumns(
    accompaniments.length,
    accompaniments.reduce(
      (curr, { purchaseOrder: { amountValue } }) => curr + amountValue,
      0
    )
  )

  return useMemo(() => {
    const { inDay, delayed } = calcCounts(accompaniments)

    return [accompaniments, columns, inDay, delayed]
  }, [accompaniments, columns])
}

export function useNonRevisedData(): ResumeData {
  const accompaniments = useNonRevisedAccompaniments()

  const columns = excludeColumns(
    accompaniments.length,
    accompaniments.reduce(
      (curr, { purchaseOrder: { amountValue } }) => curr + amountValue,
      0
    ),
    'reviewedAt',
    'releasedAt',
    'expectedBillingAt',
    'billingAt',
    'invoiceNumber',
    'freeOnBoardAt',
    'schedulingAt'
  )

  return useMemo(() => {
    const { inDay, delayed } = calcCounts(accompaniments)

    return [accompaniments, columns, inDay, delayed]
  }, [accompaniments, columns])
}

export function useRevisedData(): ResumeData {
  const accompaniments = useRevisedAccompaniments()

  const columns = excludeColumns(
    accompaniments.length,
    accompaniments.reduce(
      (curr, { purchaseOrder: { amountValue } }) => curr + amountValue,
      0
    ),
    'releasedAt',
    'expectedBillingAt',
    'billingAt',
    'invoiceNumber',
    'freeOnBoardAt',
    'schedulingAt'
  )

  return useMemo(() => {
    const { inDay, delayed } = calcCounts(accompaniments)

    return [accompaniments, columns, inDay, delayed]
  }, [accompaniments, columns])
}

export function useReleasedData(): ResumeData {
  const accompaniments = useReleasedAccompaniments()

  const columns = excludeColumns(
    accompaniments.length,
    accompaniments.reduce(
      (curr, { purchaseOrder: { amountValue } }) => curr + amountValue,
      0
    ),
    'reviewedAt',
    'expectedBillingAt',
    'billingAt',
    'invoiceNumber',
    'freeOnBoardAt',
    'schedulingAt'
  )

  return useMemo(() => {
    const { inDay, delayed } = calcCounts(accompaniments)

    return [accompaniments, columns, inDay, delayed]
  }, [accompaniments, columns])
}

export function useExpectedBillingData(): ResumeData {
  const accompaniments = useExpectedBillingAccompaniments()

  const columns = excludeColumns(
    accompaniments.length,
    accompaniments.reduce(
      (curr, { purchaseOrder: { amountValue } }) => curr + amountValue,
      0
    ),
    'reviewedAt',
    'releasedAt',
    'billingAt',
    'invoiceNumber',
    'freeOnBoardAt',
    'schedulingAt'
  )

  return useMemo(() => {
    const { inDay, delayed } = calcCounts(accompaniments)

    return [accompaniments, columns, inDay, delayed]
  }, [accompaniments, columns])
}

export function useBilledData(): ResumeData {
  const accompaniments = useBilledAccompaniments()

  const columns = excludeColumns(
    accompaniments.length,
    accompaniments.reduce(
      (curr, { purchaseOrder: { amountValue } }) => curr + amountValue,
      0
    ),
    'reviewedAt',
    'releasedAt',
    'expectedBillingAt',
    'invoiceNumber',
    'freeOnBoardAt',
    'schedulingAt'
  )

  return useMemo(() => {
    const { inDay, delayed } = calcCounts(accompaniments)

    return [accompaniments, columns, inDay, delayed]
  }, [accompaniments, columns])
}

export function useFreeOnBoardData(): ResumeData {
  const accompaniments = useFreeOnBoardAccompaniments()

  const columns = excludeColumns(
    accompaniments.length,
    accompaniments.reduce(
      (curr, { purchaseOrder: { amountValue } }) => curr + amountValue,
      0
    ),
    'reviewedAt',
    'releasedAt',
    'expectedBillingAt',
    'billingAt',
    'invoiceNumber',
    'schedulingAt'
  )

  return useMemo(() => {
    const { inDay, delayed } = calcCounts(accompaniments)

    return [accompaniments, columns, inDay, delayed]
  }, [accompaniments, columns])
}

export function useSchedulingData(): ResumeData {
  const accompaniments = useSchedulingAccompaniments()

  const columns = excludeColumns(
    accompaniments.length,
    accompaniments.reduce(
      (curr, { purchaseOrder: { amountValue } }) => curr + amountValue,
      0
    ),
    'reviewedAt',
    'releasedAt',
    'expectedBillingAt',
    'billingAt',
    'invoiceNumber',
    'freeOnBoardAt'
  )

  return useMemo(() => {
    const { inDay, delayed } = calcCounts(accompaniments)

    return [accompaniments, columns, inDay, delayed]
  }, [accompaniments, columns])
}

function calcCounts(accompaniments: Accompaniment[]) {
  const delayed = accompaniments.reduce((curr, accompaniment) => {
    if (accompaniment.isCritical) {
      return curr + 1
    }

    return curr
  }, 0)

  return { inDay: accompaniments.length, delayed }
}

function excludeColumns(
  count: number,
  amount: number,
  ...paths: string[]
): ColumnProps[] {
  return getAllAccompanimentColumns(count, amount).filter(column => {
    const exclude = Boolean(paths.find(path => path === column.cell.path))

    return !exclude
  })
}

export function getAllAccompanimentColumns(
  count: number,
  amount: number
): ColumnProps[] {
  return [
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
        value: `${count}`
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
        value: formatPrice(amount || 0),
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
        path: 'expectedBillingAt'
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
        path: 'billingAt'
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
        path: 'schedulingAt'
      }
    }
  ]
}

export type ResumeData = [Accompaniment[], ColumnProps[], number, number]
