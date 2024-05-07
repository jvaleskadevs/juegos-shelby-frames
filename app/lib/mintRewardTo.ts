import { Address } from 'viem';
import { DEGEN, SHELBY, REQUEST_ID, PROJECT_ID } from '../config';

export async function mintRewardTo(address: Address): Promise<boolean> {
  const data = {
    //requestId: REQUEST_ID,
    projectId: PROJECT_ID,
    contractAddress: SHELBY.address,
    chainId: DEGEN.chainId,
    functionSignature: 'safeMint(address)',
    args: {
      to: address
    }
  };
  const baseUrl = 'https://api.syndicate.io/';
  const sendTx = 'transact/sendTransaction';
  const getRequest = `/wallet/project/${PROJECT_ID}/request/`;
  const options = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.SYNDICATE_API_KEY}`,
      'Content-Type': 'applicaton/json'
    },
    body: JSON.stringify(data)
  };  
  console.log(options);
  const response = await fetch(baseUrl+sendTx, options);
  try {
    const tx = await response.json();
    console.log(tx);
    return true;
  } catch(err) {
    console.log(err);
    return false;
  }
  /*
  options.method = 'GET';
  const getReceipt = getRequest + tx.transactionId;
  if (response.status == 200) {
    let success;
    let counter = 0;
    while (!success || counter < 7) {
      const response = await fetch(baseUrl+getReceipt, options);
      const receipt = await response.json();
      if (receipt?.invalid) return false;
      
      for (let i = 0; i < receipt.transactionAttempts.length; i++) {
        if (receipt.transactionAttempts[i].status === "CONFIRMED") {
          success = true;
        }
      }
      
      counter++;
      
      setTimeout(() => console.log(`delay... tried ${counter} times..`), 777);
    }
    return success;
  }
  */
  return false;
}
