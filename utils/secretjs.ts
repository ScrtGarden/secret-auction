import { createContext, useMemo } from 'react'
import { CosmWasmClient } from 'secretjs'

let client: CosmWasmClient

const createClient = () => {
  return new CosmWasmClient(process.env.NEXT_PUBLIC_REST_URL as string)
}

const initilizeClient = () => {
  let _client = client ?? createClient()
  if (typeof window === 'undefined') return _client
  if (!client) client = _client

  return client
}

const useCosmWasmClient = () => {
  const client = useMemo(() => initilizeClient(), [])

  return client
}

type DefaultValue = {
  secretjs: CosmWasmClient | undefined
}

const defaultValue: DefaultValue = {
  secretjs: undefined,
}

const SecretJsContext = createContext(defaultValue)

export { useCosmWasmClient, SecretJsContext }
