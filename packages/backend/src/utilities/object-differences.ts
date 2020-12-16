import { indexOf, isEqual } from 'lodash'

export function extractDifferences(
  object: any,
  other: any,
  ignoredValues: string[] = [],
  initialValue: any = {}
): any {
  const diff = Object.keys(object).reduce((result, key) => {
    if (!other.hasOwnProperty(key)) {
      result.push(key)
    } else if (isEqual(object[key], other[key])) {
      const resultKeyIndex = result.indexOf(key)

      result.splice(resultKeyIndex, 1)
    }

    return result
  }, Object.keys(other))

  const result = initialValue

  diff.forEach(value => {
    const ignored = indexOf(ignoredValues, value) !== -1

    if (!ignored) {
      result[value] = { from: other[value], to: object[value] }
    }
  })

  return result
}

export function hasDifferences(object: object) {
  return Object.keys(object).length !== 0
}
