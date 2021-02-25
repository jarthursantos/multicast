import React, { useCallback, useRef } from 'react'
import { useDispatch } from 'react-redux'

import { useFormValidator } from 'hookable-unform'

import {
  Form,
  FormHandles,
  TextInput,
  SubmitButton,
  ActionsContainer,
  Button
} from '@shared/web-components'

import { Modal } from '~/components/Modal'
import { useTypedSelector } from '~/store'
import { cancelAccompanimentRequest } from '~/store/modules/accompaniments/actions'

import { schema } from './schema'
import { Wrapper, Container, Title, Message } from './styles'
import { CancelDialogProps, CancelData } from './types'

const CancelDialog: React.VFC<CancelDialogProps> = ({
  accompanimentId,
  isOpen,
  onClose
}) => {
  const dispatch = useDispatch()

  const formRef = useRef<FormHandles>(null)

  const { cancelingAccompaniment } = useTypedSelector(
    state => state.accompaniments
  )

  const validateForm = useFormValidator(formRef, schema)

  const handleSubmit = useCallback(
    async (data: CancelData) => {
      const { success } = await validateForm()

      if (success) {
        formRef.current?.setErrors({})

        dispatch(cancelAccompanimentRequest(accompanimentId, data.motive))
      }
    },
    [accompanimentId, dispatch, validateForm, formRef]
  )

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <Wrapper>
        <Title>Cancelar Acompanhamento</Title>

        <Form onSubmit={handleSubmit} ref={formRef}>
          <Container>
            <TextInput
              name="motive"
              label="Descrição do motivo"
              inputProps={{ autoFocus: true }}
            />
          </Container>

          <Message>* Esta ação não pode ser desfeita</Message>

          <ActionsContainer>
            <Button label="Fechar" secondary onClick={onClose} />

            <SubmitButton
              label="Confirmar Cancelamento"
              loading={cancelingAccompaniment}
            />
          </ActionsContainer>
        </Form>
      </Wrapper>
    </Modal>
  )
}

export { CancelDialog }
