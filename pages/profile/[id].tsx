import Head from 'next/head'

import { getLayout } from '../../src/components/Layouts/SiteLayout'
import ProfilePage from '../../src/components/ProfilePage'

const Page = () => (
  <>
    <Head>
      <title>Profile | tulip</title>
    </Head>
    <ProfilePage />
  </>
)

Page.getLayout = getLayout

export default Page
