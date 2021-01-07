import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'

import { useWatchAction } from '@shared/action-watcher'
import { Button } from '@shared/web-components'

import { Modal } from '~/components/Modal'
import { useTypedSelector } from '~/store'
import { markAccompanimentAsSendRequest } from '~/store/modules/accompaniments/actions'
import { Types } from '~/store/modules/accompaniments/types'

import { Wrapper, Container } from './styles'
import { ConfirmMailSendedDialogProps } from './types'

const ConfirmMailSendedDialog: React.VFC<ConfirmMailSendedDialogProps> = ({
  accompaniment,
  onClose,
  isOpen
}) => {
  const dispatch = useDispatch()

  const { markingAsSended } = useTypedSelector(state => state.accompaniments)

  const handleMarkAsSended = useCallback(() => {
    dispatch(markAccompanimentAsSendRequest(accompaniment.id))
  }, [dispatch, accompaniment])

  useWatchAction(onClose, [
    Types.MARK_ACCOMPANIMENT_SENDED_SUCCESS,
    Types.MARK_ACCOMPANIMENT_SENDED_FAILURE
  ])

  return (
    <Modal isOpen={isOpen}>
      <Wrapper>
        <h2>Envio do Pedido</h2>

        <Container>
          <Button label="Envio Pendente" onClick={onClose} secondary />

          <Button
            label="Confirmar Envio"
            onClick={handleMarkAsSended}
            loading={markingAsSended}
          />
        </Container>
      </Wrapper>
    </Modal>
  )
}

export { ConfirmMailSendedDialog }
