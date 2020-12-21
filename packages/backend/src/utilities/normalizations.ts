import { parseISO } from 'date-fns'

export function normalizeInt(number: string | number): number {
  if (typeof number === 'string') {
    return parseInt(number, 10)
  }

  return number
}

export function normalizeDate(date: string | Date): Date {
  return typeof date === 'string' ? parseISO(date) : date
}
