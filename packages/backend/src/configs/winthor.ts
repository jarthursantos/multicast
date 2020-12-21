import { normalizeInt } from '~/utilities/normalizations'

const host = String(process.env.WINTHOR_HOST)
const port = normalizeInt(process.env.WINTHOR_PORT || '')
const user = String(process.env.WINTHOR_USER)
const password = String(process.env.WINTHOR_PASSWORD)
const database = String(process.env.WINTHOR_DATABASE)

export default { host, port, user, password, database }
