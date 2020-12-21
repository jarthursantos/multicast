import Bull from 'bull'

import { IUser } from '~/domain/IUser'
import { sendMail } from '~/libraries/Mail'
import { Job } from '~/libraries/Queue'

export const NewRegistrationMail: Job<IUser> = {
  key: 'NewRegistrationMail',
  handler: async (job: Bull.Job<IUser>) => {
    const user = job.data

    await sendMail({
      to: user,
      from: {
        name: 'Equipe Dantas',
        email: 'admin@dantasdistribuidora.com.br'
      },
      subject: 'Senha de acesso ao sistema',
      body: `Caro ${user.name}, sua senha de acesso é ${user.password}`
    })
  }
}
