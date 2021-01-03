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
  '/profile/[id]': {
    color: 'grey',
    strength: 100,
  },
}

const CHAIN_EXPLORER = 'https://puzzle.report/secret/chains/holodeck-2'

const AUCTION_CONTRACT_ID = 171

// const FACTORY_CONTRACT_ID = 170
// const FACTORY_CONTRACT_ADDRESS = 'secret1s0l9vyh8futvlctv4nup8pa8lfz9u4rgcye7c2'

const FACTORY_CONTRACT_ID = 179
const FACTORY_CONTRACT_ADDRESS = 'secret1fr3m662gpe97jw2xgg4hfkn8lufq4hf8k6zn0a'

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

export {
  MAP_ROUTE_AND_COLOR,
  CHAIN_EXPLORER,
  AUCTION_CONTRACT_ID,
  FACTORY_CONTRACT_ID,
  FACTORY_CONTRACT_ADDRESS,
  OPEN_OWNER_ACTIONS,
  OPEN_BIDDER_ACTIONS,
}
