import { Router } from 'express'

import { handleSearchEmployees } from '~/app/controllers/employees'

const router = Router()

router.get('/', handleSearchEmployees)

export { router as employeesRoutes }
