import ChevronDown from './ChevronDown'
import Clock from './Clock'
import Copy from './Copy'
import Dizzy from './Dizzy'
import Farming from './Farming'
import InfoCircle from './InfoCircle'
import Keplr from './Kelpr'
import KeySkeleton from './KeySkeleton'
import Search from './Search'
import Seedling from './Seedling'
import Shovel from './Shovel'
import Telescope from './Telescope'
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
