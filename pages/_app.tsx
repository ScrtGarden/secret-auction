import 'react-datepicker/dist/react-datepicker.css'

import { ThemeProvider } from '@zendeskgarden/react-theming'
import { StoreProvider } from 'easy-peasy'
import { AppProps } from 'next/app'
import Head from 'next/head'

import LoadingPage from '../src/components/LoadingPage'
import GlobalStyle from '../src/styles/GlobalStyle'
import { useStore } from '../store'
import { Page } from '../types/page'
import useDocumentReady from '../utils/hooks/useDocumentReady'
import { SecretJsContext, useCosmWasmClient } from '../utils/secretjs'

type Props = AppProps & {
  Component: Page
}

const MyApp = ({ Component, pageProps }: Props) => {
  const store = useStore(pageProps.initialState)
  const client = useCosmWasmClient()

  // custom hook
  const { ready } = useDocumentReady()

  const getLayout = Component.getLayout || ((page) => page)

  return (
    <>
      <Head>
        <link rel="icon" type="image/png" href="favicons/favicon-16x16.png" />
        <link rel="icon" type="image/png" href="favicons/favicon-32x32.png" />
        <link rel="icon" type="image/png" href="favicons/favicon-128x128.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Hate price slippage? Place bids on on auctions that are fully decentralized utilizing Secret Network."
        />
      </Head>
      <StoreProvider store={store}>
        <SecretJsContext.Provider value={{ secretjs: client }}>
          <ThemeProvider focusVisibleRef={null}>
            <GlobalStyle />
            {ready ? getLayout(<Component {...pageProps} />) : <LoadingPage />}
          </ThemeProvider>
        </SecretJsContext.Provider>
      </StoreProvider>
    </>
  )
}

export default MyApp
