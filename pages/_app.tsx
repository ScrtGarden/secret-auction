import 'react-datepicker/dist/react-datepicker.css'

import { ThemeProvider } from '@zendeskgarden/react-theming'
import { StoreProvider } from 'easy-peasy'
import { AppProps } from 'next/app'

import LoadingPage from '../src/components/LoadingPage'
import GlobalStyle from '../src/styles/GlobalStyle'
import { useStore } from '../store'
import useDocumentReady from '../utils/hooks/useDocumentReady'
import { SecretJsContext, useCosmWasmClient } from '../utils/secretjs'

const MyApp = ({ Component, pageProps }: AppProps) => {
  const store = useStore(pageProps.initialState)
  const client = useCosmWasmClient()

  // custom hook
  const { ready } = useDocumentReady()

  return (
    <StoreProvider store={store}>
      <SecretJsContext.Provider value={{ secretjs: client }}>
        <ThemeProvider focusVisibleRef={null}>
          <GlobalStyle />
          {ready ? <Component {...pageProps} /> : <LoadingPage />}
        </ThemeProvider>
      </SecretJsContext.Provider>
    </StoreProvider>
  )
}

export default MyApp
