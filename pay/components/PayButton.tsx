import { useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { createTransfer } from "@/utils/createTransfer";
import BigNumber from "bignumber.js";
import { PublicKey } from "@solana/web3.js";

interface InputProps {
  recipientKey: string;
  amount: number;
  name: string;
}

export default function PayButton({ recipientKey, amount, name }: InputProps) {
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const [isLoading, setIsLoading] = useState(false);

  const transferUSDC = async () => {
    const recipient = new PublicKey('HoMSres2Bb8EojvfmXTSdsSWwYHHvG39qqGWEWA34Uzj');
    console.log(recipient)
    if (!publicKey) return;

    
    const splToken = new PublicKey("4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU");
    const amount = BigNumber(0.1);

    try {
      console.log(splToken, recipient, amount)
      const tx = await createTransfer(connection, publicKey, {
        recipient,
        amount,
        splToken,
      });
      console.log(tx)
      const signature = await sendTransaction(tx, connection);
      console.log(signature);
      // Display success message or handle transaction completion
    } catch (error) {
      console.error("Error transferring tokens:", error);
      // Display error message or handle error case
    }
  };

  return (
    <button
      className="bg-[#09342A] min-w-[18rem] px-5 py-3 font-mono transition-transform transform-gpu hover:scale-105"
      onClick={transferUSDC}
      disabled={!publicKey}
    >
      Ok I agree to pay {amount} USDC to {!name ? 'Unknown Receipient': <span className="font-bold">{name}</span>}
    </button>
  );
}

