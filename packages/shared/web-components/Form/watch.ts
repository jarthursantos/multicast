import { useState, RefObject, useEffect } from 'react'

import { FormHandles } from './index'

export function useFieldWatch<T>(
  formRef: RefObject<FormHandles>,
  fieldName: string
) {
  const [value, setValue] = useState<T>()

  useEffect(() => {
    const inputRef: HTMLInputElement = formRef.current?.getFieldRef(fieldName)

    if (!inputRef) {
      return
    }

    inputRef.oninput = () => {
      const fieldValue: T = formRef.current?.getFieldValue(fieldName)

      setValue(fieldValue)
    }
  }, [formRef, fieldName])

  return value
}
