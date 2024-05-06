import { getFrameHtmlResponse } from '@coinbase/onchainkit/frame';
import { getFarcasterUserAddress } from '@coinbase/onchainkit/farcaster';
import { NextRequest, NextResponse } from 'next/server';
import {
  init,
  validateFramesMessage,
  ValidateFramesMessageInput,
  ValidateFramesMessageOutput,
} from '@airstack/frames';
import { Address, toHex } from 'viem';
import { mintRewardTo } from '../../../lib/mintRewardTo';
import { URL } from '../../../config';
import { Errors } from '../../../errors';
import { rewards } from '../../../rewards';

init(process.env.NEXT_PUBLIC_AIRSTACK_API_KEY ?? '');

async function getResponse(req: NextRequest): Promise<NextResponse> {
  try {
    const body: ValidateFramesMessageInput = await req.json();
    const { isValid, message } = await validateFramesMessage(body);
    
    if (!isValid) return new NextResponse(Errors.NoValidMessage);

    const fid: number = message?.data?.fid ?? 0;
    if (fid === 0) return new NextResponse(Errors.NoFID);
    
    const action = message?.data?.frameActionBody || undefined;
   
    if (action?.buttonIndex === 1) {
      if (rewards.includes(fid)) {       
        const address: Address | undefined = (
          await getFarcasterUserAddress(fid)
        )?.verifiedAddresses?.[0] as Address | undefined;
        if (!address) return new NextResponse(Errors.NoAddress);
        const success = await mintRewardTo(address);
        if (success) {
          return new NextResponse(getFrameHtmlResponse({
            image: { 
              src: `${URL}/success.jpeg`, 
              aspectRatio: '1:1' 
            },
            postUrl: `${URL}/api/frame/claim`
          }));            
        }
      }
    }
  } catch(err) {
    console.log(err);
  }
  return new NextResponse(getFrameHtmlResponse({
    buttons: [
      {
        label: 'Obtener recompensa'
      },
      {
        action: 'link',
        label: 'Ver a T. Shelby',
        target: 'https://warpcast.com/thommyshelby17'
      }
    ],
    image: { 
      src: `${URL}/intro.jpeg`, 
      aspectRatio: '1:1' 
    },
    postUrl: `${URL}/api/frame/claim`
  }));
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
