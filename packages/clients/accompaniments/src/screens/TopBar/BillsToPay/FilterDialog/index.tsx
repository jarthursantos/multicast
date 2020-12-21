import React, {
  useRef,
  useState,
  useCallback,
  useImperativeHandle,
  forwardRef,
  useEffect
} from 'react'
import { MdClose } from 'react-icons/md'
import { useDispatch } from 'react-redux'

import { useWatchAction } from '@shared/action-watcher'
import {
  Form,
  ActionsContainer,
  TextInput,
  NumberInput,
  SubmitButton,
  Button,
  FormHandles
} from '@shared/web-components'

import { Modal } from '~/components/Modal'
import { useTypedSelector } from '~/store'
import {
  clearFilterAccompanimentRequestAction,
  filterAccompanimentRequestAction
} from '~/store/modules/accompaniments/actions'
import {
  AccompanimentFilters,
  Types
} from '~/store/modules/accompaniments/types'

import {
  Wrapper,
  Container,
  InlineWithName,
  Indicator,
  CloseButton,
  FieldsContainer
} from './styles'
import { BillsToPayFilterHandles } from './types'

const BillsToPayFilterComponent: React.ForwardRefRenderFunction<BillsToPayFilterHandles> = (
  _,
  ref
) => {
  const dispatch = useDispatch()
  const formRef = useRef<FormHandles>(null)

  const { filters } = useTypedSelector(state => state.accompaniments)

  const [opened, setOpened] = useState(false)
  const [position, setPosition] = useState<DOMRect>()

  const open = useCallback((rect: DOMRect) => {
    setOpened(true)
    setPosition(rect)
  }, [])
  const close = useCallback(() => setOpened(false), [])

  const handleClearFilter = useCallback(
    () => dispatch(clearFilterAccompanimentRequestAction()),
    [dispatch]
  )

  const handleApplyFilter = useCallback(
    (data: AccompanimentFilters) =>
      dispatch(filterAccompanimentRequestAction(data)),
    [dispatch]
  )

  useEffect(() => {
    formRef.current?.setData(filters)
  }, [filters, formRef, opened])

  useWatchAction(
    close,
    [
      Types.FILTER_ACCOMPANIMENT_REQUEST,
      Types.CLEAR_FILTER_ACCOMPANIMENT_REQUEST
    ],
    [close]
  )

  useImperativeHandle<{}, BillsToPayFilterHandles>(
    ref,
    () => ({ open, close }),
    [open, close]
  )

  return (
    <Modal
      isOpen={opened}
      onRequestClose={close}
      style={{
        overlay: {
          zIndex: 4
        },
        content: {
          top: (position?.top || 0) + (position?.height || 0),
          left: position?.left || 0,
          right: 'auto',
          bottom: 'auto',
          transform: undefined
        }
      }}
    >
      <Wrapper>
        <Indicator />

        <Container>
          <h2>Filtros</h2>

          <Form
            onSubmit={handleApplyFilter}
            ref={formRef}
            initialData={filters}
          >
            <FieldsContainer>
              <h3>Comprador</h3>

              <InlineWithName>
                <NumberInput name="buyerCode" label="Código" />
                <TextInput
                  name="buyerName"
                  label="Nome"
                  inputProps={{ readOnly: true }}
                />
              </InlineWithName>

              <h3>Fornecedor</h3>

              <InlineWithName>
                <NumberInput name="providerCode" label="Código" />
                <TextInput
                  name="providerName"
                  label="Nome"
                  inputProps={{ readOnly: true }}
                />
              </InlineWithName>
            </FieldsContainer>

            <ActionsContainer>
              <Button label="Limpar" onClick={handleClearFilter} secondary />
              <SubmitButton label="Aplicar" />
            </ActionsContainer>
          </Form>
        </Container>

        <CloseButton onClick={close}>
          <MdClose size={16} />
        </CloseButton>
      </Wrapper>
    </Modal>
  )
}

export * from './types'
export const BillsToPayFilter = forwardRef(BillsToPayFilterComponent)