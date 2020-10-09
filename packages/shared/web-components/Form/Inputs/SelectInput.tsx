import React, { useRef, useEffect } from 'react'
import ReactSelect, { OptionTypeBase, Props as SelectProps } from 'react-select'

import { useField } from '@unform/core'

import { InputContainer, InputLabel, InputError } from '../styles'
import { InputProps } from '../types'

type Props = Pick<InputProps, 'label' | 'name'> & {
  inputProps: SelectProps<OptionTypeBase>
} & React.HTMLAttributes<HTMLDivElement>

const SelectInput: React.FC<Props> = ({
  name,
  label,
  inputProps = {},
  ...rest
}) => {
  const selectRef = useRef(null)
  const {
    fieldName,
    defaultValue,
    registerField,
    error,
    clearError
  } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: (ref: any) => {
        if (inputProps.isMulti) {
          if (!ref.state.value) {
            return []
          }

          return ref.state.value.map((option: OptionTypeBase) => option.value)
        }

        if (!ref.state.value) {
          return ''
        }

        return ref.state.value.value
      }
    })
  }, [fieldName, registerField, inputProps.isMulti])

  return (
    <InputContainer {...rest} hasError={!!error}>
      {label && <InputLabel htmlFor={fieldName}>{label}</InputLabel>}

      <ReactSelect
        defaultValue={defaultValue}
        ref={selectRef}
        placeholder=""
        id={fieldName}
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
          menu: provided => ({ ...provided, marginTop: 0 }),
          loadingIndicator: provided => ({ ...provided, color: '#333' }),
          singleValue: provided => ({
            ...provided,
            fontSize: 14,
            color: '#666',
            paddingTop: 6,
            textTransform: 'uppercase'
          }),
          valueContainer: provided => ({
            ...provided,
            height: 36,
            padding: 0,
            paddingLeft: 8
          }),
          input: provided => ({
            ...provided,
            borderWidth: '2px !important',
            fontSize: 14,
            marginLeft: -50,
            ...(error
              ? { borderColor: '#de3b3b', ':hover': { borderColor: '#de3b3b' } }
              : {})
          }),
          control: provided => ({
            ...provided,
            height: 40,
            minHeight: 40,
            maxHeight: 40,
            borderWidth: '2px !important',
            boxShadow: '0',
            ...(error
              ? { borderColor: '#de3b3b', ':hover': { borderColor: '#de3b3b' } }
              : {})
          }),
          menuList: provided => ({
            ...provided,
            fontSize: 14
          })
        }}
        {...inputProps}
      />

      {error && <InputError>{error}</InputError>}
    </InputContainer>
  )
}
export { SelectInput }
