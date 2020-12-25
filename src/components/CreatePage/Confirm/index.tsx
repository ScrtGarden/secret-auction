import { Button } from '@zendeskgarden/react-buttons'
import { Field, Label, Textarea } from '@zendeskgarden/react-forms'
import { Dots } from '@zendeskgarden/react-loaders'
import { FC } from 'react'

import {
  Container,
  Fields,
  Header,
  InnerContainer,
  Separator,
  Title,
} from '../TokenForm/styles'

type Props = {
  value: string
  onChange: Function
  onSubmit: () => void
  loading: boolean
  isConnected: boolean
}

const Confirm: FC<Props> = (props) => {
  const { value, onChange, onSubmit, loading, isConnected } = props

  return (
    <Container>
      <InnerContainer>
        <Header>
          <Title>THE OFFER</Title>
        </Header>
        <Fields>
          <Field>
            <Label>Description (optional)</Label>
            <Textarea
              minRows={4}
              maxRows={6}
              value={value}
              onChange={(e) => onChange(e.currentTarget.value)}
              disabled={!isConnected}
            />
          </Field>
          <Separator />
          <Button
            isPrimary
            isStretched
            onClick={onSubmit}
            disabled={loading || !isConnected}
          >
            {loading ? <Dots size="20" /> : 'Create Auction!'}
          </Button>
        </Fields>
      </InnerContainer>
    </Container>
  )
}

export default Confirm
