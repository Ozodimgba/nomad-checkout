import Image from "next/image";
import { DM_Sans } from "next/font/google";
import { useRouter } from "next/router";
import { Keypair, LAMPORTS_PER_SOL, PublicKey, SendOptions, SystemProgram, Transaction, TransactionMessage, TransactionSignature, VersionedTransaction, clusterApiUrl } from "@solana/web3.js";
import { ConnectionProvider, WalletProvider, useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useCallback, useEffect, useState } from "react";
import { WalletWrapper } from "@/components/Wrapper";
import dynamic from 'next/dynamic';
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";

const dm = DM_Sans({ subsets: ["latin"] });

const WalletMultiButton = dynamic(
  () =>
    import('@solana/wallet-adapter-react-ui').then(
      mod => mod.WalletMultiButton,
    ),
  { ssr: false },
);
  

export default function Pay() {

  const [balance, setBalance] = useState<number | null>(0); 
  const [amount, setAmount] = useState<number | null>(0);
  const [txSig, setTxSig] = useState<string>('f')



  const { connected } = useWallet();
  const { publicKey, disconnect } = useWallet();

  const WalletMenu = () => {
    return(
      <div onClick={disconnect}>
        {publicKey?.toString().slice(0, 6) +
            '...' +
            publicKey?.toString().slice(-4)}
      </div>
    )
  }

  return (
     <WalletWrapper>
    <main
      className={`flex min-h-screen flex-col text-white bg-black items-center  px-0 ${dm.className}`}
    >
      <div>
        <img src="../icon.svg" className="w-[150px]" />
      </div>
      {connected ? <WalletMenu /> : <WalletMultiButton />}
    <div className=" w-full flex flex-col py-8 bg-white border-[1px] border-[#24242410] ">
      <div className="flex justify-center">
        <h2 className="text-[#09342a] font-main font-bold text-4xl">Welcome, Nomad!</h2>
      </div>
      <div className="flex mt-2 justify-center">
        <p className="text-[#09342a] font-main ">You&apos;re about to send money to <span className="font-bold">IFE ASIADIACHI</span></p>
      </div>
      <div className=" flex mt-8 justify-center my-1">
        <input placeholder="0" className="min-w-full text-center text-[#09342a] text-[7rem] border-[#09342A] py-3 px-3 focus:outline-none" />
      </div>
      <div className="w-full flex gap-4 justify-center">
      <button className="bg-[#09342A] min-w-[18rem] px-5 py-3 font-mono transition-transform transform-gpu hover:scale-105"> OK SEND 800 USDC to IFE ASIADIACHI</button>
      </div>
      <div className="flex justify-center mt-8">
        <button className="text-[#09342a] text-xl font-main ">Forgot password?</button>
      </div>
    </div>
    <div className="flex items-center gap-3 text-sm py-5"> <span className="text- text-[#FFF3D5]">Olumide Funitures received</span> <img src="../ngn.svg" className="h-[30px] w-[30px]" /> <span className="text-sm text-[#FFF3D5]">₦2000 from USDC</span></div>
    </main>
    </WalletWrapper>
  );
}
