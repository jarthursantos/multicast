export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean
  flex?: boolean
  secondary?: boolean
  label: string
}
