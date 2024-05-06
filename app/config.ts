import { JUEGOS_SHELBY_ABI } from "./abi/juegosShelby";

const LOCALHOST = 'http://localhost:3000';
const DOMAIN_URL = 'https://juegos-shelby-frames.vercel.app';
export const URL: string = process.env.NODE_ENV === 'development' ? LOCALHOST : DOMAIN_URL;

export const DEGEN = {
  address: "",
  chainId: 666666666
}

export const SHELBY = {
  address: "0xbB4E4732959C5b7246C7aC3467a04B57544E60d7",
  abi: JUEGOS_SHELBY_ABI
}


export const REQUEST_ID = process.env.NEXT_PUBLIC_REQUEST_ID ?? "";
export const PROJECT_ID = process.env.NEXT_PUBLIC_PROJECT_ID ?? "";
