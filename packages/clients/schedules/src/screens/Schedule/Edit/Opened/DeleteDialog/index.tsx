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
import { deleteScheduleRequest } from '~/store/modules/schedules/actions'
import { modalStyles } from '~/styles/modal'

import { Wrapper, Container, ActionsWrapper } from './styles'
import { IDeleteDialogHandles, IDeleteDialogProps } from './types'

const DeleteDialogComponent: React.ForwardRefRenderFunction<
  IDeleteDialogHandles,
  IDeleteDialogProps
> = ({ schedule }, ref) => {
  const dispatch = useDispatch()
  const [opened, setOpened] = useState(false)

  const { deletingSchedules } = useTypedSelector(state => state.schedules)

  const handleOpen = useCallback(() => setOpened(true), [])
  const handleClose = useCallback(() => setOpened(false), [])

  const handleDelete = useCallback(() => {
    dispatch(deleteScheduleRequest(schedule))
  }, [schedule, dispatch])

  useImperativeHandle<{}, IDeleteDialogHandles>(
    ref,
    () => ({ open: handleOpen }),
    [handleOpen]
  )

  return (
    <Modal isOpen={opened} onRequestClose={handleClose} style={modalStyles}>
      <Wrapper>
        <Container>
          <h1>Deseja realmente apagar o agendamento ?</h1>
        </Container>

        <ActionsWrapper>
          <Button label="Fechar" onClick={handleClose} secondary />

          <Button
            label="Apagar Agendamento"
            onClick={handleDelete}
            loading={deletingSchedules}
          />
        </ActionsWrapper>
      </Wrapper>
    </Modal>
  )
}

export const DeleteDialog = forwardRef(DeleteDialogComponent)
export * from './types'
