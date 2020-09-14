import { config } from 'dotenv'

config()

const host = process.env.REDIS_HOST
const port = parseInt(process.env.REDIS_PORT)

export { host, port }
