import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: none;
    box-sizing: border-box;
    user-select: none;

    font-family: "Roboto", "Segoe UI", sans-serif;

    -webkit-font-smoothing: antialiased;
  }

  a {
    text-decoration: none;
  }

  *:focus {
    outline: 0;
  }

  html, body, #root, #__next {
    height: 100%;
    overflow: hidden;
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

  ::-webkit-scrollbar {
    width: 12px;
    height: 12px;
  }

  ::-webkit-scrollbar-track {
    background: #fff;
  }

  ::-webkit-scrollbar-track:vertical {
    border-left: 1px solid #bbb;
  }

  ::-webkit-scrollbar-track:horizontal {
    border-top: 1px solid #bbb;
  }

  ::-webkit-scrollbar-thumb:vertical {
    border-left: 1px solid #bbb;
  }

  ::-webkit-scrollbar-thumb {
    background: #ddd;
  }

  ::-webkit-scrollbar-thumb:horizontal {
    border-top: 1px solid #bbb;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #bbb;
  }

  /* cyrillic-ext */
  @font-face {
    font-family: 'Roboto';
    font-style: italic;
    font-weight: 300;
    font-display: swap;
    src: local('Roboto Light Italic'), local('Roboto-LightItalic'), url('./assets/Roboto-LightItalic.ttf') format('ttf');
  }
  /* cyrillic */
  @font-face {
    font-family: 'Roboto';
    font-style: italic;
    font-weight: 300;
    font-display: swap;
    src: local('Roboto Light Italic'), local('Roboto-LightItalic'), url('./assets/Roboto-LightItalic.ttf') format('ttf');
  }
  /* greek-ext */
  @font-face {
    font-family: 'Roboto';
    font-style: italic;
    font-weight: 300;
    font-display: swap;
    src: local('Roboto Light Italic'), local('Roboto-LightItalic'), url('./assets/Roboto-LightItalic.ttf') format('ttf');
  }
  /* greek */
  @font-face {
    font-family: 'Roboto';
    font-style: italic;
    font-weight: 300;
    font-display: swap;
    src: local('Roboto Light Italic'), local('Roboto-LightItalic'), url('./assets/Roboto-LightItalic.ttf') format('ttf');
  }
  /* vietnamese */
  @font-face {
    font-family: 'Roboto';
    font-style: italic;
    font-weight: 300;
    font-display: swap;
    src: local('Roboto Light Italic'), local('Roboto-LightItalic'), url('./assets/Roboto-LightItalic.ttf') format('ttf');
  }
  /* latin-ext */
  @font-face {
    font-family: 'Roboto';
    font-style: italic;
    font-weight: 300;
    font-display: swap;
    src: local('Roboto Light Italic'), local('Roboto-LightItalic'), url('./assets/Roboto-LightItalic.ttf') format('ttf');
  }
  /* latin */
  @font-face {
    font-family: 'Roboto';
    font-style: italic;
    font-weight: 300;
    font-display: swap;
    src: local('Roboto Light Italic'), local('Roboto-LightItalic'), url('./assets/Roboto-LightItalic.ttf') format('ttf');
  }
  /* cyrillic-ext */
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 300;
    font-display: swap;
    src: local('Roboto Light'), local('Roboto-Light'), url('./assets/Roboto-Light.ttf') format('ttf');
  }
  /* cyrillic */
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 300;
    font-display: swap;
    src: local('Roboto Light'), local('Roboto-Light'), url('./assets/Roboto-Light.ttf') format('ttf');
  }
  /* greek-ext */
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 300;
    font-display: swap;
    src: local('Roboto Light'), local('Roboto-Light'), url('./assets/Roboto-Light.ttf') format('ttf');
  }
  /* greek */
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 300;
    font-display: swap;
    src: local('Roboto Light'), local('Roboto-Light'), url('./assets/Roboto-Light.ttf') format('ttf');
  }
  /* vietnamese */
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 300;
    font-display: swap;
    src: local('Roboto Light'), local('Roboto-Light'), url('./assets/Roboto-Light.ttf') format('ttf');
  }
  /* latin-ext */
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 300;
    font-display: swap;
    src: local('Roboto Light'), local('Roboto-Light'), url('./assets/Roboto-Light.ttf') format('ttf');
  }
  /* latin */
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 300;
    font-display: swap;
    src: local('Roboto Light'), local('Roboto-Light'), url('./assets/Roboto-Light.ttf') format('ttf');
  }
  /* cyrillic-ext */
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: local('Roboto'), local('Roboto-Regular'), url('./assets/Roboto-Regular.ttf') format('ttf');
  }
  /* cyrillic */
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: local('Roboto'), local('Roboto-Regular'), url('./assets/Roboto-Regular.ttf') format('ttf');
  }
  /* greek-ext */
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: local('Roboto'), local('Roboto-Regular'), url('./assets/Roboto-Regular.ttf') format('ttf');
  }
  /* greek */
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: local('Roboto'), local('Roboto-Regular'), url('./assets/Roboto-Regular.ttf') format('ttf');
  }
  /* vietnamese */
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: local('Roboto'), local('Roboto-Regular'), url('./assets/Roboto-Regular.ttf') format('ttf');
  }
  /* latin-ext */
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: local('Roboto'), local('Roboto-Regular'), url('./assets/Roboto-Regular.ttf') format('ttf');
  }
  /* latin */
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: local('Roboto'), local('Roboto-Regular'), url('./assets/Roboto-Regular.ttf') format('ttf');
  }
  /* cyrillic-ext */
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-display: swap;
    src: local('Roboto Bold'), local('Roboto-Bold'), url('./assets/Roboto-Bold.ttf') format('ttf');
  }
  /* cyrillic */
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-display: swap;
    src: local('Roboto Bold'), local('Roboto-Bold'), url('./assets/Roboto-Bold.ttf') format('ttf');
  }
  /* greek-ext */
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-display: swap;
    src: local('Roboto Bold'), local('Roboto-Bold'), url('./assets/Roboto-Bold.ttf') format('ttf');
  }
  /* greek */
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-display: swap;
    src: local('Roboto Bold'), local('Roboto-Bold'), url('./assets/Roboto-Bold.ttf') format('ttf');
  }
  /* vietnamese */
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-display: swap;
    src: local('Roboto Bold'), local('Roboto-Bold'), url('./assets/Roboto-Bold.ttf') format('ttf');
  }
  /* latin-ext */
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-display: swap;
    src: local('Roboto Bold'), local('Roboto-Bold'), url('./assets/Roboto-Bold.ttf') format('ttf');
  }
  /* latin */
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-display: swap;
    src: local('Roboto Bold'), local('Roboto-Bold'), url('./assets/Roboto-Bold.ttf') format('ttf');
  }
`
