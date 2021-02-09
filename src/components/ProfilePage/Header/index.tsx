import { Dots } from '@zendeskgarden/react-loaders'
import cryptoRandomString from 'crypto-random-string'
import { FC, memo, useState } from 'react'

import {
  CREATE_VIEWING_KEY_MAX_GAS,
  FACTORY_CONTRACT_ADDRESS,
} from '../../../../utils/constants'
import { useStoreActions } from '../../../../utils/hooks/storeHooks'
import useConnectToKeplr from '../../../../utils/hooks/useConnectToKeplr'
import keplr from '../../../../utils/keplr'
import truncateAddress from '../../../../utils/truncateAddress'
import CopyTooltip from './CopyTooltip'
import {
  Address,
  Buttons,
  Circle,
  Container,
  CopyWrapper,
  Dot,
  StyledButton,
  StyledIcon,
  Wrapper,
} from './styles'

type Props = {
  address: string
  viewingKey: string
}

const Header: FC<Props> = (props) => {
  const { address, viewingKey } = props
  const shortenAddress = truncateAddress(address)

  // store actions
  const setViewingKey = useStoreActions((actions) => actions.auth.setViewingKey)
  const toggleImportKey = useStoreActions(
    (actions) => actions.controls.toggleImportKeyModal
  )

  // custom hooks
  const [connectToKeplr] = useConnectToKeplr()

  // component states
  const [loading, setLoading] = useState(false)
  const [importing, setImporting] = useState(false)

  const getViewingKey = async () => {
    setLoading(true)

    const { error } = await connectToKeplr()

    if (error) {
      setLoading(false)
      return
    }

    const entropy = cryptoRandomString({ length: 20, type: 'base64' })
    const handleMsg = {
      create_viewing_key: {
        entropy,
      },
    }
    const { secretjs: signingClient } = await keplr.createSigningClient({
      maxGas: CREATE_VIEWING_KEY_MAX_GAS,
    })

    try {
      const result = await signingClient?.execute(
        FACTORY_CONTRACT_ADDRESS,
        handleMsg
      )
      const utf8decoder = new TextDecoder()
      const decoded = JSON.parse(utf8decoder.decode(result?.data))
      setViewingKey(decoded.viewing_key.key)
    } catch (error) {
      console.log('Error creating viewing key', error.message)
    }
    setLoading(false)
  }

  const onImport = async () => {
    setImporting(true)
    const { success } = await connectToKeplr()
    setImporting(false)
    if (success) {
      toggleImportKey()
    }
  }

  return (
    <Container>
      <Wrapper>
        <Circle>
          <StyledIcon name="mask" active={!!address} />
        </Circle>
        <div>
          <Address>{shortenAddress}</Address>
          <CopyWrapper>
            {address && <CopyTooltip value={address} label="address" />}
            {viewingKey && (
              <>
                <Dot>•</Dot>
                <CopyTooltip value={viewingKey} label="viewing key" />
              </>
            )}
          </CopyWrapper>
        </div>
      </Wrapper>
      <Buttons>
        <StyledButton
          length="short"
          size="small"
          disabled={importing || loading}
          onClick={onImport}
        >
          {importing ? <Dots size={20} /> : 'Import Key'}
        </StyledButton>
        <StyledButton
          length={viewingKey ? 'long' : 'regular'}
          isPrimary
          size="small"
          onClick={getViewingKey}
          disabled={loading || importing}
        >
          {loading ? (
            <Dots size={20} />
          ) : (
            `${viewingKey ? 'Rotate' : 'Get'} Viewing Key`
          )}
        </StyledButton>
      </Buttons>
    </Container>
  )
}

export default memo(Header)
