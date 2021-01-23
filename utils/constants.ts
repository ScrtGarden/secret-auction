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

const FACTORY_CONTRACT_ID = 253
const FACTORY_CONTRACT_ADDRESS = 'secret1vwagf5g3uap6hx2jdhsnzdar44czkz3rr0xxyr'
const AUCTION_CONTRACT_ID = 219

const OPEN_SELLER_ACTIONS = {
  finalise: 'Finalise',
  'update-min-bid': 'Update',
}

const OPEN_BIDDER_ACTIONS = {
  'update-bid': 'Update',
  retract: 'Retract',
}

const OPEN_BIDDER_OVERDUE_ACTIONS = {
  ...OPEN_BIDDER_ACTIONS,
  finalise: 'Finalise',
}

const DATE_FORMAT = 'd/MM/yy'

const CHANGE_MIN_BID_MAX_GAS = '190000'
const INCREASE_ALLOWANCE_MAX_GAS = '150000'
const CREATE_AUCTION_MAX_GAS = '600000'
const PLACE_BID_MAX_GAS = '300000'
const CREATE_VIEWING_KEY_MAX_GAS = '120000'
const RETRACT_BID_MAX_GAS = '300000'

export {
  MAP_ROUTE_AND_COLOR,
  CHAIN_EXPLORER,
  AUCTION_CONTRACT_ID,
  FACTORY_CONTRACT_ID,
  FACTORY_CONTRACT_ADDRESS,
  OPEN_SELLER_ACTIONS,
  OPEN_BIDDER_ACTIONS,
  DATE_FORMAT,
  KEPLR_CHROME_STORE_URL,
  OPEN_BIDDER_OVERDUE_ACTIONS,
  CHANGE_MIN_BID_MAX_GAS,
  INCREASE_ALLOWANCE_MAX_GAS,
  CREATE_AUCTION_MAX_GAS,
  PLACE_BID_MAX_GAS,
  CREATE_VIEWING_KEY_MAX_GAS,
  RETRACT_BID_MAX_GAS,
}
