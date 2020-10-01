import { config } from 'dotenv'

config()

const initialRequestNumber = parseInt(process.env.INITIAL_REQUEST_NUMBER || '0')

export { initialRequestNumber }
