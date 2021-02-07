import { Button } from '@zendeskgarden/react-buttons'
import { Field, Input, Message } from '@zendeskgarden/react-forms'
import { Close } from '@zendeskgarden/react-modals'
import { memo, useState } from 'react'

import { AlertType } from '../../../../store/controls/controls.models'
import { useStoreActions } from '../../../../utils/hooks/storeHooks'
import {
  ModalButtons,
  ModalContent,
  ModalHeader,
  ModalTitle,
  StyledModal,
} from '../../Common/StyledComponents'

const ImportKeyModal = () => {
  // store actions
  const toggle = useStoreActions(
    (actions) => actions.controls.toggleImportKeyModal
  )
  const setViewingKey = useStoreActions((actions) => actions.auth.setViewingKey)
  const setAlert = useStoreActions((actions) => actions.controls.setAlertInfo)

  // component state
  const [value, setValue] = useState('')
  const [error, setError] = useState('')

  const onClickImport = () => {
    if (!value) {
      setError('Invalid key. Please try again.')
      return
    }

    setAlert({
      title: 'Success',
      text: "You've successfully imported your viewing key.",
      type: AlertType.success,
    })
    setViewingKey(value.trim())
    toggle()
  }

  return (
    <StyledModal onClose={() => toggle()}>
      <ModalHeader>
        <ModalTitle>Import Viewing Key</ModalTitle>
        <Close />
      </ModalHeader>
      <ModalContent>
        <Field>
          <Input
            placeholder="Enter viewing key"
            value={value}
            onChange={(e) => setValue(e.currentTarget.value)}
            validation={error ? 'error' : undefined}
          />
          {error && <Message validation="error">{error}</Message>}
        </Field>
        <ModalButtons>
          <Button isStretched isBasic onClick={() => toggle()}>
            Cancel
          </Button>
          <Button isStretched isPrimary onClick={onClickImport}>
            Import
          </Button>
        </ModalButtons>
      </ModalContent>
    </StyledModal>
  )
}

export default memo(ImportKeyModal)
