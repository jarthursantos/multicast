import React, {
  useMemo,
  useState,
  useCallback,
  useImperativeHandle,
  forwardRef
} from 'react'
import ReactModal from 'react-modal'

import { subMonths, addMonths } from 'date-fns'

import Header from './Header'
import Month from './Month'
import { Wrapper, Container, TopIndicator, BottomIndicator } from './styles'
import { PickerHandlers, PickerProps } from './types'

const defaultStyle = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',

    padding: 0,
    border: 'none',
    backgroundColor: 'transparent',
    borderRadios: 8
  },

  overlay: {
    backgroundColor: 'rgba(0, 0, 0, .7)'
  }
}

const Picker: React.ForwardRefRenderFunction<PickerHandlers, PickerProps> = (
  { onSelectionChange, position },
  ref
) => {
  const [isOpen, setOpenned] = useState(false)
  const [rect, setRect] = useState<DOMRect | undefined>(undefined)

  const [selection, setSelection] = useState<Date | undefined>()
  const [month, setMonth] = useState(new Date())

  const topModalStyle = useMemo(
    () => ({
      content: {
        top: (rect?.y || 0) - 255,
        left: (rect?.x || 0) + (rect?.width || 0) - 248,
        bottom: 'auto',
        right: 'auto',

        padding: 0,
        border: 'none',
        backgroundColor: 'transparent'
      },

      overlay: defaultStyle.overlay
    }),
    [rect]
  )

  const bottomModalStyle = useMemo(
    () => ({
      content: {
        top: (rect?.y || 0) + 56,
        left: (rect?.x || 0) + (rect?.width || 0) - 248,
        bottom: 'auto',
        right: 'auto',

        padding: 0,
        border: 'none',
        backgroundColor: 'transparent'
      },

      overlay: defaultStyle.overlay
    }),
    [rect]
  )

  const handleOpen = useCallback((position: DOMRect, date?: Date) => {
    setRect(position)
    setOpenned(true)

    if (date) {
      setSelection(date)
      setMonth(date)
    }
  }, [])

  const handleClose = useCallback(() => setOpenned(false), [])

  const handleSelectionChange = useCallback(
    (date: Date) => {
      onSelectionChange(date)
      setSelection(date)
      handleClose()
    },
    [onSelectionChange, handleClose]
  )

  const handlePreviousMonth = useCallback(() => {
    setMonth(oldMonth => subMonths(oldMonth, 1))
  }, [])

  const handleNextMonth = useCallback(() => {
    setMonth(oldMonth => addMonths(oldMonth, 1))
  }, [])

  useImperativeHandle<{}, PickerHandlers>(
    ref,
    () => ({
      open: handleOpen
    }),
    [handleOpen]
  )

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={handleClose}
      style={position === 'top' ? topModalStyle : bottomModalStyle}
      ariaHideApp={false}
    >
      <Wrapper>
        {position === 'bottom' && <BottomIndicator />}

        <Container>
          <Header
            month={month}
            onNext={handleNextMonth}
            onPrevious={handlePreviousMonth}
          />

          <Month
            month={month}
            selection={selection}
            onSelectionChange={handleSelectionChange}
          />
        </Container>

        {position === 'top' && <TopIndicator />}
      </Wrapper>
    </ReactModal>
  )
}

export const DatePicker = forwardRef(Picker)
