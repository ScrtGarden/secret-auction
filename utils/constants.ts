import { SelectTokens } from '../interfaces'

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

const FACTORY_CONTRACT_ID = 663
const FACTORY_CONTRACT_ADDRESS = 'secret1af7gp8qk94q4en84zk7gukpr546j0zhpgkgj5w'
const AUCTION_CONTRACT_ID = 764

const OPEN_SELLER_ACTIONS = {
  finalize: 'Finalize',
  'update-min-bid': 'Update',
}

const OPEN_BIDDER_ACTIONS = {
  'update-bid': 'Update',
  retract: 'Retract',
}

const OPEN_BIDDER_OVERDUE_ACTIONS = {
  ...OPEN_BIDDER_ACTIONS,
  finalize: 'Finalize',
}

const DATE_FORMAT = 'yyyy/MM/dd hh:mm a'

const CHANGE_MIN_BID_MAX_GAS = '190000'
const INCREASE_ALLOWANCE_MAX_GAS = '150000'
const CREATE_AUCTION_MAX_GAS = '600000'
const PLACE_BID_MAX_GAS = '300000'
const CREATE_VIEWING_KEY_MAX_GAS = '120000'
const RETRACT_BID_MAX_GAS = '300000'
const FINALIZE_MAX_GAS = '2000000'

const TOKENS: SelectTokens = {
  tsdai: {
    symbol: 'TSDAI',
    decimals: 18,
    address: 'secret1r4z6fh6gzlqdf4gaqx29mr6340w9vastj4jhvv',
  },
  second: {
    symbol: 'FIRST',
    decimals: 1,
    address: 'secret1wuw7n39uw306r8w8n32wcprclsv28k5lczfmsc',
  },
  third: {
    symbol: 'THIRD',
    decimals: 1,
    address: 'secret14zgtx5nhn6x9vpuelxcczeuz4sf2w8td4zun8h',
  },
  custom: {
    symbol: 'Custom',
    decimals: 0,
    address: '',
  },
}

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
  FINALIZE_MAX_GAS,
  TOKENS,
}
