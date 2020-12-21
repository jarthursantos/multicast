import { normalizeInt } from '~/utilities/normalizations'

const initialRequestNumber = normalizeInt(
  process.env.INITIAL_REQUEST_NUMBER || '0'
)

export { initialRequestNumber }
