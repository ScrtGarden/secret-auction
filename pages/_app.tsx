import { ThemeProvider } from '@zendeskgarden/react-theming'
import { StoreProvider } from 'easy-peasy'
import { AppProps } from 'next/app'

import GlobalStyle from '../src/styles/GlobalStyle'
import theme from '../src/styles/theme'
import { useStore } from '../store'

// import { ThemeProvider } from 'styled-components'

const MyApp = ({ Component, pageProps }: AppProps) => {
  const store = useStore(pageProps.initialState)

  return (
    <StoreProvider store={store}>
      <ThemeProvider focusVisibleRef={null}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </StoreProvider>
  )
}

export default MyApp
