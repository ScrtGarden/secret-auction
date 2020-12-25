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
}

const CHAIN_EXPLORER = 'https://puzzle.report/secret/chains/holodeck-2/'

export { MAP_ROUTE_AND_COLOR, CHAIN_EXPLORER }
