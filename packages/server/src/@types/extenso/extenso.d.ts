declare module 'extenso' {
  export default function (
    n: string | number,
    o?: {
      mode?: 'number' | 'currency'
      locale?: 'pt' | 'br'
      negative?: 'formal' | 'informal'
      currency?: { type?: 'BRL' | 'EUR' | 'ECV' | 'MZN' }
      number?: {
        gender?: 'm' | 'f'
        decimal?: 'formal' | 'informal'
        decimalSeparator?: 'comma' | 'dot'
      }
    }
  ): string
}
