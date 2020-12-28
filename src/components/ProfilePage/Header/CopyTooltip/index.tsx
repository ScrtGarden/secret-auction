import { Tooltip } from '@zendeskgarden/react-tooltips'
import { FC, memo, useRef, useState } from 'react'

import { Textarea, TooltipText } from './styles'
import { StyledTitle } from './styles'

type Props = {
  value: string
  label: string
}

const CopyTooltip: FC<Props> = (props) => {
  const { value, label } = props
  const textareaRef = useRef<any>()
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    if (!copied) {
      setCopied(true)
      textareaRef.current.select()
      document.execCommand('copy')
    }
  }

  const resetCopied = () => {
    if (copied) {
      setCopied(false)
    }
  }

  return (
    <Tooltip
      delayMS={0}
      placement="bottom"
      size="large"
      zIndex={1}
      content={
        <>
          <StyledTitle>
            {copied ? `${label} copied!` : 'Copy to clipboard'}
          </StyledTitle>
          {!copied && <Textarea ref={textareaRef} value={value} readOnly />}
        </>
      }
    >
      <TooltipText onClick={copyToClipboard} onMouseOut={resetCopied}>
        {`Copy ${label}`}
      </TooltipText>
    </Tooltip>
  )
}

export default memo(CopyTooltip)
