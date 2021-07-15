import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'

import { datahubProxyLcd } from '../../../../utils/datahubProxy'

const handler = nc<NextApiRequest, NextApiResponse>()
  .get(datahubProxyLcd)
  .post(datahubProxyLcd)

export default handler
