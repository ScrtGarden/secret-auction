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
}

const CHAIN_EXPLORER = 'https://puzzle.report/secret/chains/holodeck-2'

const AUCTION_CONTRACT_ID = 171
const FACTORY_CONTRACT_ID = 170
const FACTORY_CONTRACT_ADDRESS = 'secret1s0l9vyh8futvlctv4nup8pa8lfz9u4rgcye7c2'

export {
  MAP_ROUTE_AND_COLOR,
  CHAIN_EXPLORER,
  AUCTION_CONTRACT_ID,
  FACTORY_CONTRACT_ID,
  FACTORY_CONTRACT_ADDRESS,
}
