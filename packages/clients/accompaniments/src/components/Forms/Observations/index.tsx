import React, { useCallback, useRef } from 'react'
import { MdFeedback, MdAdd } from 'react-icons/md'
import { useDispatch } from 'react-redux'

import { useFormValidator } from 'hookable-unform'

import { useWatchAction } from '@shared/action-watcher'
import {
  Form,
  TextInput,
  SubmitButton,
  FormHandles
} from '@shared/web-components'

import { useTypedSelector } from '~/store'
import { addAnnotationRequest } from '~/store/modules/accompaniments/actions'
import {
  Annotation,
  AnnotationContent,
  Types
} from '~/store/modules/accompaniments/types'

import Observation from './Observation'
import { schema } from './schema'
import {
  Container,
  ScrollBar,
  EmptyMessageWrapper,
  Content,
  FieldsWrapper
} from './styles'

interface Props {
  accompanimentId: string
  observations: Annotation[]
}

const Observations: React.VFC<Props> = ({ accompanimentId, observations }) => {
  const dispatch = useDispatch()

  const formRef = useRef<FormHandles>(null)
  const validateForm = useFormValidator(formRef, schema)

  const { additingAnnotation } = useTypedSelector(state => state.accompaniments)

  const handleAddAnnotation = useCallback(
    async (data: AnnotationContent) => {
      const { success } = await validateForm()

      if (success) {
        formRef.current?.setErrors({})

        dispatch(addAnnotationRequest(accompanimentId, data))
      }
    },
    [validateForm, dispatch, accompanimentId, formRef]
  )

  useWatchAction(
    () => formRef.current?.clearField('content'),
    [Types.ADD_ANNOTATION_SUCCESS],
    [formRef]
  )

  return (
    <Container>
      <h3>Obervações</h3>

      {observations.length !== 0 ? (
        <ScrollBar>
          <Content>
            {observations.map(observation => (
              <Observation key={observation.id} {...observation} />
            ))}
          </Content>
        </ScrollBar>
      ) : (
        <EmptyMessageWrapper>
          <MdFeedback />
          Nenhuma observação nesse acompanhamento
        </EmptyMessageWrapper>
      )}

      <Form onSubmit={handleAddAnnotation} ref={formRef}>
        <FieldsWrapper>
          <TextInput name="content" label="Nova Observação" />

          <SubmitButton
            label="Adicionar"
            loading={additingAnnotation}
            icon={<MdAdd size={24} />}
          />
        </FieldsWrapper>
      </Form>
    </Container>
  )
}

export default Observations
