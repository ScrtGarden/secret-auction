import Head from 'next/head'

import AuctionsPage from '../../src/components/AuctionsPage'
import { getLayout } from '../../src/components/Layouts/SiteLayout'

const Page = () => (
  <>
    <Head>
      <title>Auctions | tulip</title>
    </Head>
    <AuctionsPage />
  </>
)

Page.getLayout = getLayout

export default Page
