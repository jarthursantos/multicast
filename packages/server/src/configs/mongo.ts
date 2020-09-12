import { config } from 'dotenv'

config()

const URL = process.env.MONGO_URL

export { URL }
