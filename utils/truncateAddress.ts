const truncateAddress = (address: string) => {
  if (address) {
    const first = address.slice(0, 13)
    const last = address.slice(-6)
    return `${first}...${last}`
  }
}

export default truncateAddress