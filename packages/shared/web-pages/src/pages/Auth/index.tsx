import React, { useCallback, useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'

import { ipcRenderer } from 'electron'
import { useFormValidator } from 'hookable-unform'

import { useAxios, extractErrorMessage } from '@shared/axios'
import { Page } from '@shared/web-components'
import {
  Form,
  MailInput,
  TextInput,
  CheckboxInput,
  SubmitButton,
  FormHandles
} from '@shared/web-components/Form'

import { authSchema } from './schema'
import {
  Wrapper,
  Background,
  Container,
  FormContainer,
  Separator,
  ProgramDataContainer
} from './styles'
import { Props, Credentials, User } from './types'

const Auth: React.FC<Props> = props => {
  const { icon, title, version, credentials, onLogInSuccess } = props

  const api = useAxios()

  const formRef = useRef<FormHandles>(null)
  const validateForm = useFormValidator(formRef, authSchema)
  const [loading, setLoading] = useState(false)

  const handleSubmit = useCallback(
    async (authCredentials: Credentials) => {
      try {
        const { success } = await validateForm()

        if (success) {
          formRef.current?.setErrors({})
          setLoading(true)

          const { data } = await api.post<User>('/sessions', {
            ...authCredentials,
            title,
            version
          })

          onLogInSuccess(authCredentials, data)
          toast.success('Login Efetuado com Sucesso')
        }
      } catch (error) {
        const message = extractErrorMessage(error)

        toast.error(message)
      } finally {
        setLoading(false)
      }
    },
    [onLogInSuccess, formRef, title, version, api]
  )

  const handleOpenSettings = useCallback(() => {
    ipcRenderer.send('openSettings')
  }, [])

  useEffect(() => {
    if (
      credentials?.keepConnected &&
      credentials?.email &&
      credentials?.password
    ) {
      formRef.current?.submitForm()
    }
  }, [credentials, formRef])

  return (
    <Page title={`${title} - Entrar`}>
      <Wrapper>
        <Background />

        <Container>
          <ProgramDataContainer onClick={handleOpenSettings}>
            <div className="icon">
              <img src={icon} alt="icon" draggable={false} />
            </div>

            <div className="data">
              <h1>{title}</h1>

              <small>v{version}</small>
            </div>
          </ProgramDataContainer>

          <Separator />

          <FormContainer>
            <h1>Bem-vindo de volta</h1>

            <h2>Entrar</h2>

            <Form
              ref={formRef}
              onSubmit={handleSubmit}
              initialData={credentials}
            >
              <MailInput
                name="email"
                label="Seu E-Mail"
                inputProps={{
                  type: 'email',
                  autoFocus: !credentials?.email
                }}
              />

              <TextInput
                name="password"
                label="Sua Senha"
                inputProps={{
                  type: 'password',
                  autoFocus: !!credentials?.email
                }}
              />

              <CheckboxInput name="keepConnected" label="Manter conectado" />

              <SubmitButton label="Entrar" loading={loading} flex />
            </Form>
          </FormContainer>
        </Container>
      </Wrapper>
    </Page>
  )
}

export type AuthProps = Props

export { Auth as AuthPage }
export { Credentials, Roles, User } from './types'
