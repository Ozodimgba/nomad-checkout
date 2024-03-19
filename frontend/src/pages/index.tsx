import Image from "next/image";
import { DM_Sans } from "next/font/google";
import { Router, useRouter } from "next/router";
import Link from "next/link";

const dm = DM_Sans({ subsets: ["latin"] });

export default function Home() {

  const router = useRouter()

  return (
    <main
      className={`flex min-h-screen flex-col text-white bg-black items-center  px-40 ${dm.className}`}
    >
      <div>
        <img src="icon.svg" className="w-[150px]" />
      </div>
    <div className=" w-full flex flex-col py-8 bg-white border-[1px] border-[#24242410] ">
      <div className="flex justify-center">
        <h2 className="text-[#09342a] font-main font-bold text-4xl">Bypass Exchanges, Get Cash Directly!</h2>
      </div>
      <div className="flex mt-2 justify-center">
        <p className="text-[#09342a] font-main ">Pay merchants in local african curencies straight from your solana wallet</p>
      </div>
      <div className=" flex mt-8 justify-center my-1">
        <input placeholder="Enter email" className="min-w-[37rem] text-[#09342a] text-lg border-[2px] border-[#09342A] py-3 px-3" />
      </div>
      <div className="w-full flex gap-4 justify-center">
      <Link href={'./Signup'}>
      <button className="bg-[#09342A] min-w-[18rem] px-5 py-3 font-mono transition-transform transform-gpu hover:scale-105"> CREATE ACCOUNT</button>
      </Link>
      <Link href={'./Login'}>
     <button onClick={() => router.push('./createAccount')} className="relative text-[#09342A] font-mono min-w-[18rem] px-5 py-3 transition-transform transform-gpu hover:scale-105">
     <span className="absolute inset-0 border-[2px] border-[#09342A]"></span>
     LOGIN
    </button>
    </Link>
      </div>
      <div className="flex justify-center mt-8">
        <button className="text-[#09342a] text-xl font-main ">Forgot password?</button>
      </div>
    </div>
    <div className="flex items-center gap-3 mt-5"> <span className="text-2xl text-[#FFF3D5]">Olumide Funitures received</span> <img src="ngn.svg" className="h-[30px] w-[30px]" /> <span className="text-2xl text-[#FFF3D5]">₦2000 from USDC</span></div>
    </main>
  );
}
