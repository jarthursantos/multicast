import { useMemo } from 'react'

import { CellType } from '@shared/web-components/DataGrid/Body/Row/Cell/types'
import { ColumnProps } from '@shared/web-components/DataGrid/types'

import { allAccompanimentsColumns } from '~/pages/InProgress/columns'
import {
  useDownloadedAccompaniments,
  useNonScheduledAccompaniments,
  useReceivingAccompaniments,
  useScheduledAccompaniments,
  useUnlockedAccompaniments
} from '~/store/context'
import { Accompaniment } from '~/store/modules/accompaniments/types'

const columns: ColumnProps[] = [
  ...allAccompanimentsColumns,
  {
    header: {
      title: 'Agendamento',
      width: 120,
      align: 'center'
    },
    cell: {
      type: CellType.DATE,
      path: 'schedule.scheduledAt'
    }
  },
  {
    header: {
      title: 'Recebimento',
      width: 120,
      align: 'center'
    },
    cell: {
      type: CellType.DATE,
      path: 'schedule.receivedAt'
    }
  },
  {
    header: {
      title: 'Descarregamento',
      width: 140,
      align: 'center'
    },
    cell: {
      type: CellType.DATE,
      path: 'schedule.downloadedAt'
    }
  },
  {
    header: {
      title: 'Desbloqueio',
      width: 120,
      align: 'center'
    },
    cell: {
      type: CellType.DATE,
      path: 'schedule.unlockedAt'
    }
  }
]

export function useNonScheduledData(): ResumeData {
  const accompaniments = useNonScheduledAccompaniments()

  const columns = excludeColumns(
    'schedule.scheduledAt',
    'schedule.receivedAt',
    'schedule.downloadedAt',
    'schedule.unlockedAt'
  )

  return useMemo(() => {
    const { inDay, delayed } = calcCounts(accompaniments)

    return [accompaniments, columns, inDay, delayed]
  }, [accompaniments, columns])
}

export function useScheduledData(): ResumeData {
  const accompaniments = useScheduledAccompaniments()

  const columns = excludeColumns(
    'schedule.receivedAt',
    'schedule.downloadedAt',
    'schedule.unlockedAt'
  )

  return useMemo(() => {
    const { inDay, delayed } = calcCounts(accompaniments)

    return [accompaniments, columns, inDay, delayed]
  }, [accompaniments, columns])
}

export function useReceivingData(): ResumeData {
  const accompaniments = useReceivingAccompaniments()

  const columns = excludeColumns('schedule.downloadedAt', 'schedule.unlockedAt')

  return useMemo(() => {
    const { inDay, delayed } = calcCounts(accompaniments)

    return [accompaniments, columns, inDay, delayed]
  }, [accompaniments, columns])
}

export function useDownloadedData(): ResumeData {
  const accompaniments = useDownloadedAccompaniments()

  const columns = excludeColumns('schedule.unlockedAt')

  return useMemo(() => {
    const { inDay, delayed } = calcCounts(accompaniments)

    return [accompaniments, columns, inDay, delayed]
  }, [accompaniments, columns])
}

export function useUnlockedData(): ResumeData {
  const accompaniments = useUnlockedAccompaniments()

  const columns = excludeColumns()

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
  return columns.filter(column => {
    const exclude = Boolean(paths.find(path => path === column.cell.path))

    return !exclude
  })
}

export type ResumeData = [Accompaniment[], ColumnProps[], number, number]
