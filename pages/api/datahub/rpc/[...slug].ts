import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'

import { datahubProxyRpc } from '../../../../utils/datahubProxy'

const handler = nc<NextApiRequest, NextApiResponse>()
  .get(datahubProxyRpc)
  .post(datahubProxyRpc)

export default handler
