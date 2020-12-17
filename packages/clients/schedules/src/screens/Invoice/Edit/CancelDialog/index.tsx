import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState
} from 'react'
import Modal from 'react-modal'
import { useDispatch } from 'react-redux'

import { Button } from '@shared/web-components'

import { useTypedSelector } from '~/store'
import { cancelScheduleInvoiceRequest } from '~/store/modules/schedules/actions'
import { modalStyles } from '~/styles/modal'

import { Wrapper, Container, ActionsWrapper } from './styles'
import { ICancelDialogHandles, ICancelDialogProps } from './types'

const CancelDialogComponent: React.ForwardRefRenderFunction<
  ICancelDialogHandles,
  ICancelDialogProps
> = ({ schedule, invoice }, ref) => {
  const dispatch = useDispatch()
  const [opened, setOpened] = useState(false)

  const { cancelingScheduleInvoice } = useTypedSelector(
    state => state.schedules
  )

  const handleOpen = useCallback(() => setOpened(true), [])
  const handleClose = useCallback(() => setOpened(false), [])

  const handleCancel = useCallback(() => {
    if (!schedule || !invoice) return

    dispatch(cancelScheduleInvoiceRequest(schedule, invoice))
  }, [dispatch, schedule, invoice])

  useImperativeHandle<{}, ICancelDialogHandles>(
    ref,
    () => ({ open: handleOpen }),
    [handleOpen]
  )

  return (
    <Modal isOpen={opened} onRequestClose={handleClose} style={modalStyles}>
      <Wrapper>
        <Container>
          <h1>Deseja realmente remover a nota ?</h1>
        </Container>

        <ActionsWrapper>
          <Button label="Fechar" onClick={handleClose} secondary />

          <Button
            label="Remover Nota"
            onClick={handleCancel}
            loading={cancelingScheduleInvoice}
          />
        </ActionsWrapper>
      </Wrapper>
    </Modal>
  )
}

export const CancelDialog = forwardRef(CancelDialogComponent)
export * from './types'
