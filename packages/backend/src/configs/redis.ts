import { normalizeInt } from '~/utilities/normalizations'

const host = String(process.env.REDIS_HOST)
const port = normalizeInt(process.env.REDIS_PORT || '')

export default { host, port }
