import {
  Close,
  Title,
  Alert as ZenAlert,
} from '@zendeskgarden/react-notifications'
import { memo, useEffect } from 'react'
import { useTransition } from 'react-spring'

import { useStoreActions, useStoreState } from '../../../utils/hooks/storeHooks'
import { Animate } from './styles'

const Alert = (): any => {
  // store actions
  const toggleAlert = useStoreActions((actions) => actions.controls.toggleAlert)

  // store state
  const info = useStoreState((state) => state.controls.alertInfo)
  const showAlert = useStoreState((state) => state.controls.showAlert)

  // react-spring
  const transitions = useTransition(showAlert, null, {
    from: { opacity: 0, translate: -20 },
    enter: { opacity: 1, translate: 0 },
    leave: { opacity: 0, translate: -20 },
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      if (showAlert) {
        toggleAlert()
      }
    }, 10000)

    return () => {
      clearTimeout(timer)
    }
  }, [showAlert])

  return transitions.map(
    ({ item, key, props: { opacity, translate } }) =>
      item && (
        <Animate
          key={key}
          style={{
            opacity,
            transform: translate?.interpolate((y) => `translateY(${y}px)`),
          }}
        >
          <ZenAlert type={info.type}>
            <Title>{info.title}</Title>
            {info.text}
            <Close aria-label="Close Alert" onClick={() => toggleAlert()} />
          </ZenAlert>
        </Animate>
      )
  )
}

export default memo(Alert)
