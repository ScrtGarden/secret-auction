import { Close, Title } from '@zendeskgarden/react-notifications'
import { memo, useEffect } from 'react'

import { useStoreActions, useStoreState } from '../../../utils/hooks/storeHooks'
import { StyledAlert } from './styles'

const Alert = () => {
  // store actions
  const toggleAlert = useStoreActions((actions) => actions.controls.toggleAlert)

  // store state
  const info = useStoreState((state) => state.controls.alertInfo)

  useEffect(() => {
    setTimeout(() => {
      toggleAlert()
    }, 5000)
  }, [])

  return (
    <StyledAlert type={info.type}>
      <Title>{info.title}</Title>
      {info.text}
      <Close aria-label="Close Alert" onClick={() => toggleAlert()} />
    </StyledAlert>
  )
}

export default memo(Alert)
