import createHttpError from 'http-errors'

import { NewRegistrationMail } from '~/app/jobs/NewRegistrationMail'
import { IUser, createUser } from '~/domain/IUser'
import { enqueueJob } from '~/libraries/Queue'
import { IUserChangesModel } from '~/models/users/changes/IUserChangesModel'
import { IUsersModel } from '~/models/users/IUsersModel'

import { ICreateUserDTO } from './dto'

export function createCreateUserModule(
  usersModel: IUsersModel,
  userChangesModel: IUserChangesModel
) {
  return {
    async execute(authUser: IUser, data: ICreateUserDTO) {
      const { email } = data

      const emailAlreadyInUse = await usersModel.findByEmail(
        email.toLowerCase()
      )

      if (emailAlreadyInUse) {
        throw new createHttpError.Conflict('Email já existe')
      }

      const user = createUser({ ...data, email: data.email.toLowerCase() })

      await usersModel.save(user)
      await userChangesModel.logStore(authUser, user)

      await enqueueJob(NewRegistrationMail.key, user)

      delete user.password

      return user
    }
  }
}
