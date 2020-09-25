export * from './types'
export * from './main'
export * from './renderer'

// interface User {
//   firstName: string
//   lastName: string
// }

// const manager = new StateManager<User[]>([])

// manager.registerAction<User>('sendMessage', ({ payload, state }) => {
//   const { firstName, lastName } = payload

//   return {
//     responseType: 'success',
//     result: `${firstName} ${lastName}`,
//     state
//   }
// })

// const response = manager.dispatchAction<User, string, string>('sendMessage', {
//   firstName: 'Arthur',
//   lastName: 'Santos'
// })

// console.log(response)
