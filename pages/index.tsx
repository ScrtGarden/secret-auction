import Head from 'next/head'

import Home from '../src/components/HomePage'
import { getLayout } from '../src/components/Layouts/SiteLayout'

const Page = () => (
  <>
    <Head>
      <title>Home | tulip</title>
    </Head>
    <Home />
  </>
)

Page.getLayout = getLayout

export default Page
