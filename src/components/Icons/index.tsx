import ArrowRight from './ArrowRight'
import ChevronDown from './ChevronDown'
import Clock from './Clock'
import Copy from './Copy'
import Dizzy from './Dizzy'
import DreamWorld from './DreamWorld'
import Farming from './Farming'
import Heatmap from './Heatmap'
import InfoCircle from './InfoCircle'
import Keplr from './Kelpr'
import KeySkeleton from './KeySkeleton'
import Mask from './Mask'
import Search from './Search'
import Seedling from './Seedling'
import Shovel from './Shovel'
import StatsMan from './StatsMan'
import Telescope from './Telescope'
import TransferMoney from './TransferMoney'
import Tulip from './Tulip'
import User from './User'
import UserCircle from './UserCircle'
import UserSecret from './UserSecret'

type Props = {
  name?: string
  className?: string
}

const Icon = (props: Props) => {
  const { name, className, ...rest } = props

  let SelectedIcon

  switch (name) {
    case 'heatmap':
      SelectedIcon = Heatmap
      break
    case 'transfer-money':
      SelectedIcon = TransferMoney
      break
    case 'dream-world':
      SelectedIcon = DreamWorld
      break
    case 'stats-man':
      SelectedIcon = StatsMan
      break
    case 'arrow-right':
      SelectedIcon = ArrowRight
      break
    case 'tulip':
      SelectedIcon = Tulip
      break
    case 'mask':
      SelectedIcon = Mask
      break
    case 'telescope':
      SelectedIcon = Telescope
      break
    case 'shovel':
      SelectedIcon = Shovel
      break
    case 'key-skeleton':
      SelectedIcon = KeySkeleton
      break
    case 'user-circle':
      SelectedIcon = UserCircle
      break
    case 'clock':
      SelectedIcon = Clock
      break
    case 'info-circle':
      SelectedIcon = InfoCircle
      break
    case 'copy':
      SelectedIcon = Copy
      break
    case 'chevron-down':
      SelectedIcon = ChevronDown
      break
    case 'search':
      SelectedIcon = Search
      break
    case 'user':
      SelectedIcon = User
      break
    case 'user-secret':
      SelectedIcon = UserSecret
      break
    case 'keplr':
      SelectedIcon = Keplr
      break
    case 'seedling':
      SelectedIcon = Seedling
      break
    case 'dizzy':
      SelectedIcon = Dizzy
      break
    case 'farming':
      SelectedIcon = Farming
      break
    default:
      SelectedIcon = Dizzy
      break
  }

  return <SelectedIcon className={className} {...rest} />
}

export default Icon
