import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState
} from 'react'
import ReactSelect, { OptionTypeBase, Props as SelectProps } from 'react-select'

import { useField } from '@unform/core'

import { InputContainer, InputLabel, InputError } from '../styles'
import { InputProps } from '../types'

type Props = Pick<InputProps, 'label' | 'name'> & {
  inputProps: SelectProps<OptionTypeBase>
  onSelectionChange?: Dispatch<SetStateAction<string>>
} & React.HTMLAttributes<HTMLDivElement>

const SelectInput: React.FC<Props> = ({
  name,
  label,
  inputProps = {},
  onSelectionChange,
  ...rest
}) => {
  const { options } = inputProps

  const {
    fieldName,
    defaultValue,
    registerField,
    error,
    clearError
  } = useField(name)

  const alreadySet = useRef(false)
  const [selection, setSelection] = useState<OptionTypeBase>()

  useEffect(() => {
    if (alreadySet.current) return

    const defaultOption = options?.find(option => option.value === defaultValue)

    if (defaultOption) {
      alreadySet.current = true
    }

    setSelection(defaultOption)
  }, [defaultValue, options])

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => selection?.value,
      setValue: (_: any, value: any) => {
        setSelection(
          options?.find(option => option.value === value || value === option)
        )
      }
    })
  }, [fieldName, registerField, selection, options])

  return (
    <InputContainer isSelect {...rest} hasError={!!error}>
      {label && <InputLabel htmlFor={fieldName}>{label}</InputLabel>}

      <ReactSelect
        id={fieldName}
        placeholder=""
        value={selection}
        onChange={(value: OptionTypeBase) => {
          onSelectionChange && onSelectionChange(value.value)

          setSelection(value)
        }}
        onFocus={clearError}
        loadingMessage={() => 'Carregando'}
        theme={theme => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary: '#666',
            primary25: '#ddd',
            primary50: '#ddd',
            primary75: '#ddd'
          }
        })}
        styles={{
          menu: provided => ({ ...provided, marginTop: 0, marginBottom: 0 }),
          loadingIndicator: provided => ({ ...provided, color: '#333' }),
          singleValue: provided => ({
            ...provided,
            fontSize: 14,
            color: '#666',
            textTransform: 'uppercase'
          }),
          input: provided => ({
            ...provided,
            borderWidth: '2px !important',
            fontSize: 14,
            ...(error
              ? { borderColor: '#de3b3b', ':hover': { borderColor: '#de3b3b' } }
              : {})
          }),
          control: provided => ({
            ...provided,
            borderWidth: '2px !important',
            boxShadow: '0',
            ...(error
              ? { borderColor: '#de3b3b', ':hover': { borderColor: '#de3b3b' } }
              : {})
          }),
          menuList: provided => ({
            ...provided,
            fontSize: 14,
            textTransform: 'uppercase'
          })
        }}
        {...inputProps}
        isSearchable={true}
      />

      {error && <InputError>{error}</InputError>}
    </InputContainer>
  )
}

export { SelectInput }
