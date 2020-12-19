import { createGlobalStyle } from "styled-components"
import { normalize } from 'styled-normalize'

const GlobalStyle = createGlobalStyle`
  ${normalize}

  * {
    box-sizing: border-box;
  }

  html {
    font-size: 62.5%;
    height: 100%;
  }

  body {
    font-family: 'Open Sans';
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: inherit;
  }

  #__next {
    display: flex;
    flex-direction: column;
    height: inherit;
  }

  @font-face {
    font-family: 'Open Sans';
    src: url("/fonts/OpenSans/OpenSans-Bold.ttf") format('truetype');
    font-weight: 800;
    font-style: normal;
  }

  @font-face {
    font-family: 'Open Sans';
    src: url("/fonts/OpenSans/OpenSans-Regular.ttf") format('truetype');
    font-weight: 600;
    font-style: normal;
  }

  @font-face {
    font-family: 'Open Sans';
    src: url("/fonts/OpenSans/OpenSans-Light.ttf") format('truetype');
    font-weight: 400;
    font-style: normal;
  }
`

export default GlobalStyle