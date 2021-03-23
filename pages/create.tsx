import Head from 'next/head'

import CreatePage from '../src/components/CreatePage'
import { getLayout } from '../src/components/Layouts/SiteLayout'

const Page = () => (
  <>
    <Head>
      <title>Create | tulip</title>
    </Head>
    <CreatePage />
  </>
)

Page.getLayout = getLayout

export default Page
