import { Router } from 'express'

import {
  handleFindAllDepartments,
  handleFindDepartmentWebById
} from '~/app/controllers/departments'

const router = Router()

router.get('/', handleFindAllDepartments)
router.get('/:id', handleFindDepartmentWebById)

export { router as departmentsRoutes }
