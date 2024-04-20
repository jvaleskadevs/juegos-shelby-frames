import { getFrameMetadata } from '@coinbase/onchainkit/frame';
import type { Metadata } from 'next';
import { URL } from './config';

const title = 'Los Juegos Shelby';
const description = 'Los Juegos Shelby.';
const image = `${URL}/intro.png`;

const frameMetadata = getFrameMetadata({
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
    src: image, 
    aspectRatio: '1:1' 
  },
  postUrl: `${URL}/api/frame/claim`
});

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    images: [image]
  },
  other: { ...frameMetadata }
}

export default function Page() {
  return <><h1>Los Juegos Shelby.</h1></>
}
