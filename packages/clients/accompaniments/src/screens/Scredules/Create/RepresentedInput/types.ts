import { IRepresentative } from '@shared/web-components/Form/Inputs/RepresentativeInput/types'

export interface IRepresentedInputProps {
  name: string
  label: string
  disabled?: boolean
  representative?: IRepresentative
}
