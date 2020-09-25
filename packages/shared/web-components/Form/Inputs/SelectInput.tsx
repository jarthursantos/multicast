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
  const { fieldName, defaultValue, registerField, error } = useField(name)

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
    <InputContainer {...rest}>
      {label && <InputLabel htmlFor={fieldName}>{label}</InputLabel>}

      <ReactSelect
        defaultValue={defaultValue}
        ref={selectRef}
        placeholder=""
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
          singleValue: () => ({
            fontSize: 14,
            color: '#666',
            textTransform: 'uppercase'
          }),
          menu: provided => ({ ...provided, marginTop: 0 }),
          input: () => ({ borderWidth: '2px !important', fontSize: 14 }),
          control: provided => ({
            ...provided,
            borderWidth: '2px !important',
            boxShadow: '0'
          })
        }}
        classNamePrefix="react-select"
        {...inputProps}
      />

      {error && <InputError>{error}</InputError>}
    </InputContainer>
  )
}
export { SelectInput }
