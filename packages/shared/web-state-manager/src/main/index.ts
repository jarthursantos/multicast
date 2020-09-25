import { ipcMain, ipcRenderer } from 'electron'

import { Request, RequestResolver, InternalRequest, Response } from '../types'

export class StateManager<State> {
  state: State

  constructor(initialState: State) {
    this.state = initialState
  }

  registerAction<Payload = any, Result = any, ResponseType = any>(
    actionType: string,
    resolver: RequestResolver<State, Payload, Result, ResponseType>
  ) {
    ipcMain.on(actionType, async (event, params: Request<Payload>) => {
      const internalRequest: InternalRequest<State, Payload> = {
        ...params,
        state: this.state
      }

      const { responseType, result, state } = await Promise.resolve(
        resolver(internalRequest)
      )

      this.state = state

      event.returnValue = { responseType, result }
    })
  }

  dispatchAction<Payload = any, Result = any, ResponseType = any>(
    actionType: string,
    payload: Payload
  ): Response<Result, ResponseType> {
    return ipcRenderer.sendSync(actionType, payload)
  }
}
