export interface Request<Payload> {
  type: string
  payload: Payload
}

export interface InternalRequest<State, Payload> extends Request<Payload> {
  state: State
}

export interface Response<Result, ResponseType> {
  result: Result
  responseType: ResponseType
}

export interface InternalResponse<State, Result, ResponseType>
  extends Response<Result, ResponseType> {
  state: State
}

export interface RequestResolver<
  State = any,
  Payload = any,
  Result = any,
  ResponseType = any
> {
  (request: InternalRequest<State, Payload>):
    | Promise<InternalResponse<State, Result, ResponseType>>
    | InternalResponse<State, Result, ResponseType>
}
