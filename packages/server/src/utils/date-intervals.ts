import {
  getYear,
  endOfYear,
  addYears,
  startOfYear,
  format,
  isBefore,
  addDays,
  endOfMonth,
  isAfter,
  getDate,
  isEqual,
  startOfMonth,
  getMonth,
  parseISO
} from 'date-fns'

export interface DateInterval {
  from: Date
  fromFormated: string
  to: Date
  toFormated: string
  name: string
}

export function normalizeDate(date: string | Date): Date {
  return typeof date === 'string' ? parseISO(date) : date
}

export function generateDateIntervals(from: Date, to: Date) {
  const result: DateInterval[] = []

  if (getYear(from) === getYear(to)) {
    result.push({
      from,
      fromFormated: formatDate(from),
      to,
      toFormated: formatDate(to),
      name: generateDateIntervalName(from, to)
    })
  } else {
    result.push({
      from,
      fromFormated: formatDate(from),
      to: endOfYear(to),
      toFormated: formatDate(to),
      name: generateDateIntervalName(from, endOfYear(to))
    })

    let currentDate = startOfYear(getYear(from))

    while (getYear(currentDate) <= getYear(to)) {
      if (getYear(currentDate) === getYear(to)) {
        result.push({
          from: currentDate,
          fromFormated: formatDate(currentDate),
          to,
          toFormated: formatDate(to),
          name: generateDateIntervalName(currentDate, to)
        })
      } else {
        result.push({
          from: currentDate,
          fromFormated: formatDate(currentDate),
          to: endOfYear(currentDate),
          toFormated: formatDate(endOfYear(currentDate)),
          name: generateDateIntervalName(currentDate, endOfYear(currentDate))
        })
      }

      currentDate = addYears(currentDate, 1)
    }
  }

  return result
}

export function generateMonthlyDateIntervals(from: Date, to: Date) {
  const result: DateInterval[] = []

  let startPoint = from
  const endPoint = addDays(to, 1)

  if (isEqual(from, to)) {
    result.push({
      from,
      fromFormated: formatDate(from),
      to,
      toFormated: formatDate(to),
      name: generateMonthlyDateIntervalName(from, to)
    })
  } else {
    while (isBefore(startPoint, endPoint)) {
      let endMonth = endOfMonth(startPoint)

      if (formatDate(startPoint) === formatDate(endMonth)) {
        startPoint = addDays(startPoint, 1)
        endMonth = endOfMonth(startPoint)
      }

      if (isAfter(endMonth, endPoint)) {
        if (isAfter(startPoint, to)) {
          break
        }

        result.push({
          from: startPoint,
          fromFormated: formatDate(startPoint),
          to,
          toFormated: formatDate(to),
          name: generateMonthlyDateIntervalName(startPoint, to)
        })

        break
      } else {
        result.push({
          from: startPoint,
          fromFormated: formatDate(startPoint),
          to: endMonth,
          toFormated: formatDate(endMonth),
          name: generateMonthlyDateIntervalName(startPoint, endMonth)
        })
      }

      while (getDate(startPoint) < getDate(endMonth)) {
        startPoint = addDays(startPoint, 1)
      }
    }
  }
  return result
}

function generateDateIntervalName(from: Date, to: Date): string {
  if (isACompleteYear(from, to)) {
    return `${getYear(from)}`
  } else {
    return `${formatDate(from)} - ${formatDate(to)}`
  }
}

const months = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro'
]

function generateMonthlyDateIntervalName(from: Date, to: Date): string {
  if (isACompleteMonth(from, to)) {
    return `${months[getMonth(from)]}, ${getYear(from)}`
  } else if (formatDate(from) === formatDate(to)) {
    return formatDate(from)
  } else {
    return `${formatDate(from)} - ${formatDate(to)}`
  }
}

function isACompleteYear(from: Date, to: Date): boolean {
  if (
    formatDate(from) === formatDate(startOfYear(from)) &&
    formatDate(to) === formatDate(endOfYear(to))
  ) {
    return true
  }

  return false
}

function isACompleteMonth(from: Date, to: Date): boolean {
  if (
    formatDate(from) === formatDate(startOfMonth(from)) &&
    formatDate(to) === formatDate(endOfMonth(to))
  ) {
    return true
  }

  return false
}

export function formatDate(date: Date) {
  return format(date, 'dd/MM/yyyy')
}
