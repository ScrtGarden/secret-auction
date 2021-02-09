const parseErrorMessage = (message: string) => {
  let parsedMessage = 'Something went wrong. Please try again later.'

  if (message.includes('Request rejected')) {
    parsedMessage = 'Request rejected.'
  } else if (message.includes('out of gas')) {
    parsedMessage = 'Sorry you ran out of gas.'
  }

  return parsedMessage
}

export default parseErrorMessage
