import { useState } from "react";
import { Button } from "@chakra-ui/react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { setCookie } from 'cookies-next';
import {
  Connection,
  Keypair,
  ParsedAccountData,
  PublicKey,
  SystemProgram,
  Transaction,
  clusterApiUrl,
} from "@solana/web3.js";
import useToastHook from "@/hooks/useToastHook";
import { createTransfer } from "@solana/pay";
import BigNumber from "bignumber.js";

interface InputProps {
  receipient: string;
  amountProp: number;
  name: string;
}

export default function PayButton({ receipient, amountProp, name}: InputProps) {
  const { publicKey, sendTransaction, wallet } = useWallet();
  const { connection } = useConnection();
  const [isLoading, setIsLoading] = useState(false);

  const displayToast = useToastHook();

  

 const transferUSDC = async () => {
  if (!publicKey) return;

  const recipient = new PublicKey(receipient);
  const splToken = new PublicKey('4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU'); //You must change this to USDC in prod!
  const amount = BigNumber(amountProp);

  const tx = await createTransfer(connection, publicKey, { recipient, amount, splToken })
  console.log(tx);
  const signature = await sendTransaction(tx, connection);
  console.log(signature)
  displayToast(signature);
  

  }

  return (
    <button className="bg-[#09342A] min-w-[18rem] px-5 py-3 font-mono transition-transform transform-gpu hover:scale-105" onClick={transferUSDC} disabled={!publicKey}>
    Ok I agree to pay {amountProp} USDC to {name}
    </button>
  );
}
