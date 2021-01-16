export interface RouteAndColor {
  color: string
  strength: number
}

interface MapRouteAndColor {
  [key: string]: RouteAndColor
}

const MAP_ROUTE_AND_COLOR: MapRouteAndColor = {
  '/': {
    color: 'kale',
    strength: 500,
  },
  '/create': {
    color: 'grey',
    strength: 100,
  },
  '/auctions': {
    color: 'grey',
    strength: 100,
  },
  '/auctions/[address]': {
    color: 'grey',
    strength: 100,
  },
  '/profile/[id]': {
    color: 'grey',
    strength: 100,
  },
}

const CHAIN_EXPLORER = 'https://secretnodes.com/secret/chains/holodeck-2'

const KEPLR_CHROME_STORE_URL =
  'https://chrome.google.com/webstore/detail/keplr/dmkamcknogkgcdfhhbddcghachkejeap?hl=en'

const FACTORY_CONTRACT_ID = 220
const FACTORY_CONTRACT_ADDRESS = 'secret1zzhwed94q894l4t3ckmdvs5twyeeg2nudmm3ar'
const AUCTION_CONTRACT_ID = 219

const OPEN_OWNER_ACTIONS = {
  consign: 'Consign',
  finalise: 'Finalise & Close',
}

const OPEN_BIDDER_ACTIONS = {
  retract: 'Retract Bid',
  bid: 'Bid',
}

const CLOSED_AUCTION_ACTIONS = {
  return: 'Return All',
}

const DATE_FORMAT = 'do MMM yyyy'

export {
  MAP_ROUTE_AND_COLOR,
  CHAIN_EXPLORER,
  AUCTION_CONTRACT_ID,
  FACTORY_CONTRACT_ID,
  FACTORY_CONTRACT_ADDRESS,
  OPEN_OWNER_ACTIONS,
  OPEN_BIDDER_ACTIONS,
  DATE_FORMAT,
  KEPLR_CHROME_STORE_URL,
}
