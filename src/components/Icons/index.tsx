import Dizzy from './Dizzy'
import Farming from './Farming'
import Keplr from './Kelpr'
import Seedling from './Seedling'

type Props = {
  name?: string
  className?: string
}

const Icon = (props: Props) => {
  const { name, className, ...rest } = props

  let SelectedIcon

  switch (name) {
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
