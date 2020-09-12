import { Role } from '@prisma/client'
import * as Yup from 'yup'

const Roles = [Role.ADMIN, Role.USER]

export const updateUserSchema = Yup.object().shape({
  name: Yup.string(),

  email: Yup.string().email('Email inválido'),

  password: Yup.string(),

  permissions_id: Yup.number().integer('permissions_id should be a integer'),

  role: Yup.string().oneOf(Roles)
})
