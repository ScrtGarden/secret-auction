import { Button } from '@zendeskgarden/react-buttons'
import {
  Dropdown,
  Item,
  Menu,
  Separator,
  Trigger,
} from '@zendeskgarden/react-dropdowns'
import {
  Field,
  Input,
  Label,
  MediaInput,
  Message,
} from '@zendeskgarden/react-forms'
import { Dots } from '@zendeskgarden/react-loaders'
import { FC, FormEvent, memo, useContext, useMemo, useState } from 'react'

import { SelectToken } from '../../../../interfaces'
import { SecretJsContext } from '../../../../utils/secretjs'
import validateAddress from '../../../../utils/validateAddress'
import { TokenError } from '../../../../utils/validators/createAuction'
import { Separator as Gap } from '../../Common/StyledComponents'
import Balance from '../Balance'
import {
  Container,
  Header,
  StyledButton,
  StyledField,
  StyledIcon,
  StyledInputGroup,
} from './styles'

type Props = {
  priority?: number
  label?: string
  value: string
  onChange: (value: string) => void
  selected: string
  onSelect: (value: string) => void
  data: { [key: string]: SelectToken }
  setTokens: (key: string, value: SelectToken) => void
  errors?: TokenError
  disableInput?: boolean
  disableSelect?: boolean
}

const InputTokenSelector: FC<Props> = (props) => {
  const {
    selected,
    onSelect,
    data,
    setTokens,
    label,
    priority,
    value,
    onChange,
    errors,
    disableInput,
    disableSelect,
  } = props
  const { secretjs: queryClient } = useContext(SecretJsContext)

  // component state
  const [isOpen, setIsOpen] = useState(false)
  const [fetchingTokenInfo, setFetchingTokenInfo] = useState(false)
  const [manualAddress, setManualAddress] = useState('')
  const [manualAddressError, setManualAddressError] = useState('')

  const items = useMemo(
    () =>
      Object.entries(data).map(([key, value]) => ({
        ...value,
        value: key,
      })),
    [data]
  )

  const onChangeAmount = (e: FormEvent<HTMLInputElement>) => {
    const amount = e.currentTarget.value
    const pattern = `^\\d{1,}(\\.\\d{0,${data[selected].decimals}})?$`
    const regex = new RegExp(pattern)

    if (!amount || amount.match(regex)) {
      onChange(amount)
    }
  }

  const onSelectToken = (value: string) => {
    if (value !== 'custom' && selected === 'custom') {
      setManualAddress('')
      setManualAddressError('')
    }

    onChange('')
    onSelect(value)
  }

  const onChangeManualAddress = async (e: FormEvent<HTMLInputElement>) => {
    const address = e.currentTarget.value
    setManualAddress(address)
    if (validateAddress(address)) {
      try {
        setFetchingTokenInfo(true)
        const queryMsg = {
          token_info: {},
        }
        const trimmedAddress = address.trim()
        const response = await queryClient?.queryContractSmart(
          trimmedAddress,
          queryMsg
        )
        const { token_info } = response

        if (token_info) {
          setManualAddressError('')
          setTokens(token_info.name, {
            address,
            symbol: token_info.symbol,
            decimals: token_info.decimals,
          })
          onChange('')
          setManualAddress('')
          setManualAddressError('')
          onSelect(token_info.name)
        }
      } catch (error) {
        console.log('Could not fetch token info', error)
        setManualAddressError('Invalid token contract address.')
      }
      setFetchingTokenInfo(false)
    }
  }

  return (
    <Container>
      <StyledField priority={priority}>
        <Header>
          <Label>{label}</Label>
          {data[selected].address && (
            <Balance
              tokenAddress={data[selected].address}
              symbol={data[selected].symbol}
              decimals={data[selected].decimals}
            />
          )}
        </Header>
        <StyledInputGroup>
          <Input
            placeholder="Enter amount"
            value={value}
            onChange={onChangeAmount}
            validation={errors?.amount ? 'error' : undefined}
            disabled={disableInput}
          />
          <Dropdown
            isOpen={isOpen}
            selectedItem={selected}
            onSelect={onSelectToken}
            onStateChange={(state) => {
              if (state.isOpen !== undefined) {
                setIsOpen(state.isOpen)
              }
            }}
          >
            <Trigger>
              <StyledButton focusInset disabled={disableSelect}>
                {data[selected].symbol}
                <Button.EndIcon isRotated={isOpen}>
                  <StyledIcon name="chevron-down" disabled={disableSelect} />
                </Button.EndIcon>
              </StyledButton>
            </Trigger>
            <Menu placement="bottom-end">
              {items
                .filter((item) => item.value !== 'custom')
                .map((option) => (
                  <Item key={option.value} value={option.value}>
                    {option.symbol}
                  </Item>
                ))}
              <Separator />
              <Item value="custom">Add token</Item>
            </Menu>
          </Dropdown>
        </StyledInputGroup>
        {errors?.amount && (
          <Message validation="error">{errors.amount}</Message>
        )}
      </StyledField>
      {selected === 'custom' && (
        <>
          <Gap sm />
          <Field>
            <MediaInput
              isCompact
              placeholder="Enter contract address"
              value={manualAddress}
              onChange={onChangeManualAddress}
              end={fetchingTokenInfo ? <Dots size="18" /> : undefined}
              validation={manualAddressError ? 'error' : undefined}
            />
            {manualAddressError && (
              <Message validation="error">{manualAddressError}</Message>
            )}
          </Field>
        </>
      )}
    </Container>
  )
}

export default memo(InputTokenSelector)
