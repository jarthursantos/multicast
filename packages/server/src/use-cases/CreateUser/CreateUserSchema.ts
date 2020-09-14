import { Role } from '@prisma/client'
import * as Yup from 'yup'

const Roles = [Role.ADMIN, Role.USER]

export const createUserSchema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),

  email: Yup.string().email('Email inválido').required('Email é obrigatório'),

  permissions_id: Yup.number().integer('permissions_id should be a integer'),

  role: Yup.string().oneOf(Roles)
})
