import { SelectTokens } from '../interfaces'

export interface RouteAndColor {
  color: string
  strength: number
  custom?: string
}

interface MapRouteAndColor {
  [key: string]: RouteAndColor
}

const MAP_ROUTE_AND_COLOR: MapRouteAndColor = {
  '/': {
    color: 'blue',
    strength: 200,
    // custom: '#ede0cf',
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

const CHAIN_EXPLORER = `https://secretnodes.com/secret/chains/${process.env.NEXT_PUBLIC_CHAIN_ID}`

const KEPLR_CHROME_STORE_URL =
  'https://chrome.google.com/webstore/detail/keplr/dmkamcknogkgcdfhhbddcghachkejeap?hl=en'

const FACTORY_CONTRACT_ADDRESS = process.env
  .NEXT_PUBLIC_FACTORY_CONTRACT_ADDRESS as string

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
const EXTEND_MAX_GAS = '300000'

const TESTNET_SELECTION_TOKENS: SelectTokens = {
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

const MAINNET_SELECTION_TOKENS: SelectTokens = {
  sscrt: {
    symbol: 'SSCRT',
    address: 'secret1k0jntykt7e4g3y88ltc60czgjuqdy4c9e8fzek',
    decimals: 6,
  },
  seth: {
    symbol: 'SETH',
    address: 'secret1wuzzjsdhthpvuyeeyhfq2ftsn3mvwf9rxy6ykw',
    decimals: 18,
  },
  susdt: {
    symbol: 'SUSDT',
    address: 'secret18wpjn83dayu4meu6wnn29khfkwdxs7kyrz9c8f',
    decimals: 6,
  },
  sdai: {
    symbol: 'SDAI',
    address: 'secret1vnjck36ld45apf8u4fedxd5zy7f5l92y3w5qwq',
    decimals: 18,
  },
  stusd: {
    symbol: 'STUSD',
    address: 'secret1ryh523y4e3233hphrkdslegszqz8syjfpthcpp',
    decimals: 18,
  },
  custom: {
    symbol: 'Custom',
    decimals: 0,
    address: '',
  },
}

const TOKENS =
  process.env.NEXT_PUBLIC_EXPERIMENTAL_CHAIN === 'true'
    ? TESTNET_SELECTION_TOKENS
    : MAINNET_SELECTION_TOKENS

const DEFAULT_SELECTED_TOKEN =
  process.env.NEXT_PUBLIC_EXPERIMENTAL_CHAIN === 'true' ? 'tsdai' : 'sscrt'

const PREVIEW_AUCTIONS_FILTER: string[] =
  process.env.NEXT_PUBLIC_EXPERIMENTAL_CHAIN === 'true'
    ? ['SSCRT', 'TSDAI', 'TSUSDT']
    : ['SSCRT', 'SUSDT', 'SDAI']

export interface FilterToken {
  value: string
  label: string
}

const FILTER_TOKENS = Object.values(TOKENS)
  .map((token) => ({ label: token.symbol, value: token.symbol }))
  .filter((token) => token.label !== 'Custom')

const TESTNET_FILTER_TOGGLE_BUTTONS = {
  all: {
    label: 'All',
    value: '',
  },
  sscrt: {
    label: 'SSCRT Auctions',
    value: 'SSCRT',
  },
  tsdai: {
    label: 'TSDAI Auctions',
    value: 'TSDAI',
  },
}

const MAINNET_FILTER_TOGGLE_BUTTONS = {
  all: {
    label: 'All',
    value: '',
  },
  sscrt: {
    label: 'SSCRT Auctions',
    value: 'SSCRT',
  },
  seth: {
    label: 'SETH Auctions',
    value: 'SETH',
  },
  susdt: {
    label: 'SUSDT Auctions',
    value: 'SUSDT',
  },
  sdai: {
    label: 'SDAI Auctions',
    value: 'SDAI',
  },
}

const FILTER_TOGGLE_BUTTONS =
  process.env.NEXT_PUBLIC_EXPERIMENTAL_CHAIN === 'true'
    ? TESTNET_FILTER_TOGGLE_BUTTONS
    : MAINNET_FILTER_TOGGLE_BUTTONS

export interface Feature {
  icon: string
  title: string
  description: string
  link?: string
}

const FEATURES: Feature[] = [
  {
    icon: 'dream-world',
    title: 'Create',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    link: '',
  },
  {
    icon: 'transfer-money',
    title: 'Bid',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    link: '',
  },
  {
    icon: 'heatmap',
    title: 'Interact',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    link: '',
  },
]

const GITHUB_LINK = 'https://github.com/ScrtGarden/secret-auction'

export {
  MAP_ROUTE_AND_COLOR,
  CHAIN_EXPLORER,
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
  EXTEND_MAX_GAS,
  FILTER_TOKENS,
  FEATURES,
  GITHUB_LINK,
  DEFAULT_SELECTED_TOKEN,
  PREVIEW_AUCTIONS_FILTER,
  FILTER_TOGGLE_BUTTONS,
}
