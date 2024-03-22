import Image from "next/image";
import { DM_Sans } from "next/font/google";
import { useRouter } from "next/router";
import WalletMultiButton from "@/components/WalletMultiButton";
import { ConnectionProvider, WalletProvider, useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useCallback, useEffect, useState } from "react";
import dynamic from 'next/dynamic';
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import PayButton from "@/components/PayButton";

const dm = DM_Sans({
  subsets: ["latin"],
  weight: "400"
});


export default function Pay() {

  const [balance, setBalance] = useState<number | null>(0); 
  const [amount, setAmount] = useState<number>(0);
  const [txSig, setTxSig] = useState<string>('f')

  useEffect(() => {
   console.log(amount)
  },[amount])


  const { connected } = useWallet();
  const { publicKey, disconnect } = useWallet();

  return (
    <main
      className={`flex min-h-screen flex-col text-white bg-black items-center  px-0 ${dm.className}`}
    >
      <div>
        <img src="../icon.svg" className="w-[150px]" />
      </div>
   
      { connected ? <>
        <div className=" w-full flex flex-col justify-center py-8 bg-white  border-[1px] border-[#24242410] ">
      <div className="flex justify-center">
        <h2 className="text-[#09342a] font-main font-bold text-4xl">Welcome, Nomad!</h2>
      </div>
        <div className="flex mt-2 justify-center">
        <p className="text-[#09342a] font-main ">You&apos;re about to send money to <span className="font-bold">IFE ASIADIACHI</span></p>
      </div>
      <div className=" flex mt-8 justify-center my-1">
        <input placeholder="0" onChange={(e) => setAmount(e.target.value)}  className="min-w-full text-center font-semibold text-[#09342a] text-[8rem] border-[#09342A] py-3 px-3 focus:outline-none" />
      </div>
      <div className="w-full flex gap-4 justify-center">
        <PayButton receipient="9Xkt75L6YLmfVyNXQyBzM2Cd8PUW6pmUZSk3oyG57cjJ" amountProp={amount} />
      </div>
      <div className="flex justify-center mt-8">
        <button className="text-[#09342a] text-xl font-main ">Issues with your transaction? Contact Us</button>
      </div>
      </div>
      </>: <><div className="bg-white h-[70vh] w-full flex justify-center items-center">
      <WalletMultiButton />
        </div></>}
      
    
    <div className="flex items-center gap-3 text-xl py-5"> <span className="text- text-[#FFF3D5]">Olumide Funitures received</span> <img src="../ngn.svg" className="h-[30px] w-[30px]" /> <span className="text-sm text-[#FFF3D5]">₦2000 from USDC</span></div>
    </main>
  );
}

