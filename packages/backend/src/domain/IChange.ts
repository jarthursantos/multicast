export interface IChange<Type> {
  from?: Type
  to: Type
}

export interface IChargeEntity {
  code: string
  name: string
}
