import { createGlobalStyle } from 'styled-components'

import 'react-toastify/dist/ReactToastify.css'
import 'react-perfect-scrollbar/dist/css/styles.css'

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: none;
    box-sizing: border-box;
    user-select: none;

    font-family: 'Roboto', sans-serif;
    -webkit-font-smoothing: antialiased;
  }

  a {
    text-decoration: none;
  }

  *:focus {
    outline: 0;
  }

  html, body, #root {
    height: 100%;
  }

  ul {
    list-style: none;
  }

  button {
    cursor: pointer;
  }

  .ps__thumb-y,
  .ps__thumb-x {
    border-radius: 0px;
  }

  .Toastify__toast {
    padding: 0 16px;
    border-radius: 8px;
    min-height: 48px;
  }

  .Toastify__toast-body {
    font-size: 14px;
  }

  .Toastify__progress-bar {
    height: 2px;
  }
`

export { GlobalStyle }
