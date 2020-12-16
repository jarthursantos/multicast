import React, { Dispatch, SetStateAction, useEffect, useMemo } from 'react'
import { OptionsType, OptionTypeBase } from 'react-select'
import ReactSelect from 'react-select/async'

import debounce from 'debounce-promise'

import { InputContainer, InputLabel } from '../styles'
import { InputError } from '../styles'
import { InputProps } from '../types'

type Props = Pick<InputProps, 'label' | 'name'> & {
  selection?: OptionTypeBase
  setSelection: Dispatch<SetStateAction<OptionTypeBase | undefined>>
  onSelect(option: OptionTypeBase): void
  noOptionsMessage(obj: { inputValue: string }): string
  loadOptions(
    inputValue: string,
    callback: (options: OptionsType<OptionTypeBase>) => void
  ): void
  error?: string
  clearError?: () => void
  inputProps?: { isDisabled: boolean }
  single?: boolean
}

const AsyncSelectInput: React.FC<Props> = ({
  name,
  label,
  onSelect,
  loadOptions,
  error,
  clearError,
  inputProps,
  single,
  selection,
  setSelection,
  ...rest
}) => {
  const debouncedLoadOptions = useMemo(() => {
    return debounce(loadOptions, 500)
  }, [loadOptions])

  useEffect(() => {
    if (!single && selection) {
      onSelect(selection)

      setSelection(null)
    }
  }, [selection, onSelect, single])

  return (
    <InputContainer isSelect {...rest}>
      {label && <InputLabel htmlFor={name}>{label}</InputLabel>}

      <ReactSelect
        id={name}
        placeholder=""
        cacheOptions={false}
        value={selection}
        onChange={setSelection}
        defaultOptions
        loadingMessage={() => 'Carregando'}
        maxMenuHeight={150}
        menuPosition="fixed"
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
        loadOptions={debouncedLoadOptions}
        isSearchable={true}
        onBlur={clearError}
        {...inputProps}
        {...rest}
      />

      {error && <InputError>{error}</InputError>}
    </InputContainer>
  )
}
export { AsyncSelectInput }
