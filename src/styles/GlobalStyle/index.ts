import { createGlobalStyle } from 'styled-components'
import { normalize } from 'styled-normalize'

const GlobalStyle = createGlobalStyle`
  ${normalize}

  * {
    box-sizing: border-box;
  }

  html {
    font-size: 62.5%;
    min-height: 100vh;
  }

  body {
    font-family: 'Open Sans';
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    min-height: inherit;
  }

  #__next {
    display: flex;
    flex-direction: column;
    min-height: inherit;
  }

  @font-face {
    font-family: 'Open Sans';
    src: url("/fonts/OpenSans/OpenSans-Light.ttf") format('truetype');
    font-weight: 300;
    font-style: normal;
  }

  @font-face {
    font-family: 'Open Sans';
    src: url("/fonts/OpenSans/OpenSans-LightItalic.ttf") format('truetype');
    font-weight: 300;
    font-style: italic;
  }

  @font-face {
    font-family: 'Open Sans';
    src: url("/fonts/OpenSans/OpenSans-Regular.ttf") format('truetype');
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: 'Open Sans';
    src: url("/fonts/OpenSans/OpenSans-Italic.ttf") format('truetype');
    font-weight: 400;
    font-style: italic;
  }

  @font-face {
    font-family: 'Open Sans';
    src: url("/fonts/OpenSans/OpenSans-SemiBold.ttf") format('truetype');
    font-weight: 600;
    font-style: normal;
  }

  @font-face {
    font-family: 'Open Sans';
    src: url("/fonts/OpenSans/OpenSans-SemiBoldItalic.ttf") format('truetype');
    font-weight: 600;
    font-style: italic;
  }

  @font-face {
    font-family: 'Open Sans';
    src: url("/fonts/OpenSans/OpenSans-Bold.ttf") format('truetype');
    font-weight: 700;
    font-style: normal;
  }

  @font-face {
    font-family: 'Open Sans';
    src: url("/fonts/OpenSans/OpenSans-BoldItalic.ttf") format('truetype');
    font-weight: 700;
    font-style: italic;
  }

  @font-face {
    font-family: 'Open Sans';
    src: url("/fonts/OpenSans/OpenSans-ExtraBold.ttf") format('truetype');
    font-weight: 800;
    font-style: normal;
  }

  @font-face {
    font-family: 'Open Sans';
    src: url("/fonts/OpenSans/OpenSans-ExtraBoldItalic.ttf") format('truetype');
    font-weight: 800;
    font-style: italic;
  }
`

export default GlobalStyle
