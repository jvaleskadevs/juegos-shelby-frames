import { Address, createPublicClient, http } from "viem";
import { DEGEN, SHELBY } from "../config";

const publicClient = createPublicClient({
  chain: DEGEN.chain,
  transport: http(process.env.RPC_URL)
});

export const isRewardClaimed = async (season: number, address: Address): Promise<boolean> => {  
  return await isGenesisRewardClaimed(address);
}

const isGenesisRewardClaimed = async (address: Address): Promise<boolean> => {
  const balance: any = await publicClient.readContract({
    abi: SHELBY.abi,
    address: SHELBY.address,
    functionName: 'balanceOf',
    args: [address],
  });  
  
  return balance > 0n;
}
