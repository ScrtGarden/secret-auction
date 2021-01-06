import { ThemeProvider } from '@zendeskgarden/react-theming'
import { StoreProvider } from 'easy-peasy'
import { AppProps } from 'next/app'

import GlobalStyle from '../src/styles/GlobalStyle'
import { useStore } from '../store'
import { SecretJsContext, useCosmWasmClient } from '../utils/secretjs'

const MyApp = ({ Component, pageProps }: AppProps) => {
  const store = useStore(pageProps.initialState)
  const client = useCosmWasmClient()

  return (
    <StoreProvider store={store}>
      <SecretJsContext.Provider value={{ secretjs: client }}>
        <ThemeProvider focusVisibleRef={null}>
          <GlobalStyle />
          <Component {...pageProps} />
        </ThemeProvider>
      </SecretJsContext.Provider>
    </StoreProvider>
  )
}

export default MyApp
