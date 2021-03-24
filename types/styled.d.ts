// import original module declarations
import { DEFAULT_THEME, PALETTE } from '@zendeskgarden/react-theming'
import 'styled-components'
import theme from '../src/styles/theme'

type CustomTheme = typeof DEFAULT_THEME & typeof PALETTE

declare module 'styled-components' {
  export interface DefaultTheme extends CustomTheme {}
}
