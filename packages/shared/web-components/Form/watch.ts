import { useState, RefObject, useEffect } from 'react'

import { FormHandles } from './index'

export function useFieldWatch(
  formRef: RefObject<FormHandles>,
  fieldName: string
) {
  const [value, setValue] = useState()

  useEffect(() => {
    const inputRef: HTMLInputElement = formRef.current?.getFieldRef(fieldName)

    if (!inputRef) {
      return
    }

    inputRef.oninput = () => {
      const fieldValue = formRef.current?.getFieldValue(fieldName)

      setValue(fieldValue)
    }
  }, [formRef, fieldName])

  return value
}
