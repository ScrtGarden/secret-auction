import ChevronDown from './ChevronDown'
import Dizzy from './Dizzy'
import Farming from './Farming'
import Keplr from './Kelpr'
import Search from './Search'
import Seedling from './Seedling'
import User from './User'
import UserSecret from './UserSecret'

type Props = {
  name?: string
  className?: string
}

const Icon = (props: Props) => {
  const { name, className, ...rest } = props

  let SelectedIcon

  switch (name) {
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
