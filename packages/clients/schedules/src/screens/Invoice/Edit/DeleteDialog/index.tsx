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
import { deleteScheduleInvoiceRequest } from '~/store/modules/schedules/actions'
import { modalStyles } from '~/styles/modal'

import { Wrapper, Container, ActionsWrapper } from './styles'
import { IDeleteDialogHandles, IDeleteDialogProps } from './types'

const DeleteDialogComponent: React.ForwardRefRenderFunction<
  IDeleteDialogHandles,
  IDeleteDialogProps
> = ({ schedule, invoice }, ref) => {
  const dispatch = useDispatch()
  const [opened, setOpened] = useState(false)

  const { deletingScheduleInvoice } = useTypedSelector(state => state.schedules)

  const handleOpen = useCallback(() => setOpened(true), [])
  const handleClose = useCallback(() => setOpened(false), [])

  const handleDelete = useCallback(() => {
    if (!schedule || !invoice) return

    dispatch(deleteScheduleInvoiceRequest(schedule, invoice))
  }, [dispatch, schedule, invoice])

  useImperativeHandle<{}, IDeleteDialogHandles>(
    ref,
    () => ({ open: handleOpen }),
    [handleOpen]
  )

  return (
    <Modal isOpen={opened} onRequestClose={handleClose} style={modalStyles}>
      <Wrapper>
        <Container>
          <h1>Deseja realmente apagar a nota ?</h1>
        </Container>

        <ActionsWrapper>
          <Button label="Fechar" onClick={handleClose} secondary />

          <Button
            label="Apagar Nota"
            onClick={handleDelete}
            loading={deletingScheduleInvoice}
          />
        </ActionsWrapper>
      </Wrapper>
    </Modal>
  )
}

export const DeleteDialog = forwardRef(DeleteDialogComponent)
export * from './types'
