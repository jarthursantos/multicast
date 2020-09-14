import Bull from 'bull'
import { User } from 'entities/User'
import Mail from 'libs/Mail'
import { Job } from 'libs/Queue'

class NewRegistrationMail implements Job<User> {
  get key() {
    return 'NewRegistrationMail'
  }

  async handler(job: Bull.Job<User>): Promise<void> {
    const user = job.data

    await Mail.sendMail({
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

export default new NewRegistrationMail()
