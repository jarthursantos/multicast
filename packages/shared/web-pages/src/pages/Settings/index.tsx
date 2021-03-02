import React, { useCallback, useRef, useState } from 'react'
import { toast } from 'react-toastify'

import { ipcRenderer } from 'electron'
import { useFormValidator } from 'hookable-unform'

import { extractErrorMessage } from '@shared/axios'
import {
  Form,
  FormHandles,
  SubmitButton,
  TextInput,
  NumberInput
} from '@shared/web-components'

import { schema } from './schema'
import { Container, InlineServerContainer, Actions } from './styles'
import { Props, Settings } from './types'

const SettingsPage: React.FC<Props> = ({
  title,
  settings,
  onSettingsChange
}) => {
  const formRef = useRef<FormHandles>(null)

  const validateForm = useFormValidator(formRef, schema)
  const [loading, setLoading] = useState(false)

  const handleClose = useCallback(() => ipcRenderer.send('closeSettings'), [])

  const handleSubmit = useCallback(
    async (data: Settings) => {
      const { success } = await validateForm()

      try {
        setLoading(true)

        if (success) {
          formRef.current?.setErrors({})

          onSettingsChange(data)

          // handleClose()
        }
      } catch (error) {
        const message = extractErrorMessage(error)

        toast.error(message)
      } finally {
        setLoading(false)
      }
    },
    [validateForm, formRef, onSettingsChange, handleClose]
  )

  return (
    <Container>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={settings}>
        <InlineServerContainer>
          <TextInput
            name="network.ip"
            label="IP do Servidor"
            className="server"
          />

          <NumberInput name="network.port" label="Porta" width={90} />
        </InlineServerContainer>

        <Actions>
          <SubmitButton label="Salvar" loading={loading} />
        </Actions>
      </Form>
    </Container>
  )
}

export type SettingsProps = Props

export { NetworkSettings, Settings } from './types'
export { SettingsPage }
