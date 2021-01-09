const decoder = (data: Uint8Array) => {
  const utf8decoder = new TextDecoder()
  const decoded = JSON.parse(utf8decoder.decode(data))
  return decoded
}

export default decoder
