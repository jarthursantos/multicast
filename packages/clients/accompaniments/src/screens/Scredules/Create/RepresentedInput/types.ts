import { IRepresentative } from '@shared/web-components/Form/Inputs/RepresentativeInput/types'

import { IRepresentedProvider } from './Represented/types'

export interface IRepresentedInputProps {
  name: string
  label: string
  disabled?: boolean
  representative?: IRepresentative
  onRepresentedChanges?(representeds: IRepresentedProvider[]): void
}
