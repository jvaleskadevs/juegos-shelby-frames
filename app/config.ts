import { JUEGOS_SHELBY_ABI } from "./abi/juegosShelby";
import { Address, defineChain } from 'viem';

const LOCALHOST = 'http://localhost:3000';
const DOMAIN_URL = 'https://juegos-shelby-frames.vercel.app';
export const URL: string = process.env.NODE_ENV === 'development' ? LOCALHOST : DOMAIN_URL;

export const DEGEN = {
  address: "",
  chainId: 666666666,
  chain: defineChain({
    id: 666666666,
    name: 'Degen',
    nativeCurrency: {
      decimals: 18,
      name: 'Degen',
      symbol: 'DEGEN',
    },
    rpcUrls: {
      default: {
        http: ['https://rpc.degen.tips'],
        webSocket: ['wss://rpc.degen.tips'],
      },
    },
    blockExplorers: {
      default: { name: 'Explorer', url: 'https://explorer.degen.tips' },
    }
  })
}

export const SHELBY = {
  address: "0xbB4E4732959C5b7246C7aC3467a04B57544E60d7" as Address,
  abi: JUEGOS_SHELBY_ABI
}


export const REQUEST_ID = process.env.REQUEST_ID ?? "";
export const PROJECT_ID = process.env.PROJECT_ID ?? "";
