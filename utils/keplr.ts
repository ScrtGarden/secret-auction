import { SigningCosmWasmClient } from "secretjs";

declare global {
  interface Window {
      keplr: any;
      getOfflineSigner: any;
      getEnigmaUtils: any;
  }
}

interface ErrorResponse {
  message: string
}

interface Response {
  success?: boolean,
  error?: ErrorResponse
}

const getKeplr = (): any => {
  return window.keplr
}

const getGetOfflineSigner = (id: string | undefined) => {
  return window.getOfflineSigner(id)
}

const getGetEnigmaUtils = () => {
  return window.getEnigmaUtils
}

const setup = async (): Promise<Response> => {
  const keplr = getKeplr()
  
  if (!keplr) {
    return { error: { message: "Kelpr not installed." } }
  }

  await keplr.experimentalSuggestChain({
    chainId: process.env.NEXT_PUBLIC_CHAIN_ID,
    chainName: "Local Secret Chain",
    rpc: process.env.NEXT_PUBLIC_RPC_URL,
    rest: process.env.NEXT_PUBLIC_REST_URL,
    bip44: {
      coinType: 529,
    },
    coinType: 529,
    stakeCurrency: {
      coinDenom: "SCRT",
      coinMinimalDenom: "uscrt",
      coinDecimals: 6,
    },
    bech32Config: {
      bech32PrefixAccAddr: "secret",
      bech32PrefixAccPub: "secretpub",
      bech32PrefixValAddr: "secretvaloper",
      bech32PrefixValPub: "secretvaloperpub",
      bech32PrefixConsAddr: "secretvalcons",
      bech32PrefixConsPub: "secretvalconspub",
    },
    currencies: [
      {
        coinDenom: "SCRT",
        coinMinimalDenom: "uscrt",
        coinDecimals: 6,
      },
    ],
    feeCurrencies: [
      {
        coinDenom: "SCRT",
        coinMinimalDenom: "uscrt",
        coinDecimals: 6,
      },
    ],
    gasPriceStep: {
      low: 0.1,
      average: 0.25,
      high: 0.4,
    },
    features: ["secretwasm"],
  });

  try {
    await keplr.enable(process.env.NEXT_PUBLIC_CHAIN_ID)
    return { success: true }
  } catch (error) {
    return { error: { message: error.message } }
  }
}

const getAccounts = async () => {
  try {
    const keplrOfflineSigner = getGetOfflineSigner(process.env.NEXT_PUBLIC_CHAIN_ID)
    const accounts = await keplrOfflineSigner.getAccounts()
    return { accounts }
  } catch (error) {
    return {error: { message: error.message }}
  }
}


export default {
  setup,
  getAccounts
}