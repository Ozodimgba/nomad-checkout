import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form"
import { PhoneInput } from 'react-international-phone';
import { useState, useEffect, useRef } from "react";
import { useRouter } from 'next/router'
import 'react-international-phone/style.css'
import OTPForm from "@/components/OtpForm";
import { createQR } from "../../utils/createQr";
import { decrypt } from "@/lib";
import { Connection, clusterApiUrl, PublicKey, AccountInfo } from "@solana/web3.js";

type Inputs = {
    email: string
    fullName: string
    dob: string;
}

export default function User({ data }: any) {
  const [phone, setPhone] = useState('');
  const [hasBank, setHasBank] = useState<boolean>(true)
  const [isActivated, setIsActivated] = useState<boolean>(false)
  const qrRef = useRef<HTMLDivElement>(null)

  const connection = new Connection(clusterApiUrl('devnet'))

  const router = useRouter()

  useEffect(() => {
    const qr = createQR(
        `https://phantom.app/ul/browse/https%3A%2F%2Fnomad-checkout.vercel.app%2F%3Faddress%3DHoMSres2Bb8EojvfmXTSdsSWwYHHvG39qqGWEWA34Uzj?ref=https%3A%2F%2Fnomad-checkout.vercel.app%2F`, // The Solana Pay URL
        350, // The size of the QR code
        "#09342a" // The background color of the QR code
      );
    
      // Update the ref with the QR code
      if (qrRef.current) {
        qrRef.current.innerHTML = "";
        qr.append(qrRef.current);
      }
  })

  useEffect(() => {
    (async () => {
      try {
        const wallet = data.user.nomadVault as unknown as string;
        const address = new PublicKey(wallet);
        const recipientInfo = await connection.getAccountInfo(address);
        
        if (!recipientInfo) {
          setIsActivated(false);
          console.log("Recipient info not found:", recipientInfo);
        } else {
          setIsActivated(true);
          console.log("Recipient info found:", recipientInfo);
        }
      } catch (error) {
        console.error("Error fetching recipient info:", error);
        // Handle the error, display a message, or set a state indicating an error occurred
        setIsActivated(false); // For example, set a state to indicate an error occurred
        console.log("Failed to fetch recipient info"); // Display an error message to the user
      }
    })();
  }, [data.user.nomadVault, connection]);

  console.log('client: ' + JSON.stringify(data.user.nomadVault))

  


  return (
    <main
      className={`flex min-h-screen font-main py-5 flex-col text-white bg-[#101010] items-center  px-40`}
    >

    <div className=" w-full flex flex-col py-8 bg-white border-[1px] border-[#24242410] ">
      <div className="flex justify-between text-[#09342a] px-6">
        <h2 className="font-main font-bold text-4xl">nomad</h2>
        <div className="flex flex-col items-end">
            <h4>{data?.user.email}</h4>
            <h4 className="text-md ">{data?.user.kycInfo[0].fullName?.toUpperCase()}</h4>
        </div>
      </div>
     { data?.user.bankingInfo !== null ? <>
        <div className="flex mt-6 px-6 justify-center">
        <div className="h-[5rem] flex justify-between w-full bg-[#09342a]">
         <div className="p-4">
            <h3 className="text-xl ">{data?.user.bankingInfo.bank_name}</h3>
            <h3 className="text-md">{data?.user.bankingInfo.account_number}</h3>
        </div>
        <div className="flex items-center p-4">
            <button onClick={() => router.push('./generateQR')} className="bg-white text-[#09342a] px-3 py-2 font-mono">GENERATE ONE TIME QR PAYMENT</button>
        </div>
        </div>
      </div>
      <div className="text-[#09342a] mt-1 px-6 flex justify-end">
        <button onClick={() => router.replace('/user/AddBankAccount')} className="font-mono text-sm">EDIT BANK INFO</button>
      </div>
     </> : <>
        <div className="w-full flex py-8 justify-center">
        <button onClick={() => router.replace('/user/AddBankAccount')} className="bg-[#09342a] text-white px-3 py-2 font-mono">+ ADD BANK ACCOUNT</button>
        </div>
     </>}

     {/**should initialize by sending sol to the vault account from the backend */}
     {isActivated ?
      <>
      { data?.user.bankingInfo !== null ? <>
      {qrRef && 
                    <div className='py-4 flex justify-center'>
                        <div className="rounded-[2rem]" ref={qrRef} />
                    </div>
                }
     </> : null}
      </> :
      <>
      <div className="flex justify-center pt-4">
        <h3 className="text-[#09342a]">Your solana wallet is not initialized so people can&apos;t send money to it. But don&apos;t worry you we got you</h3>
      </div>
      <div className="w-full flex py-8 justify-center">
      <button className="bg-[#09342a] text-white px-3 py-2 font-mono">INITIALIZE WALLET</button>
      </div>
      </>
    }
     
     
      
     

      <div className="flex justify-center mt-8">
        <button className="text-[#09342a] text-xl font-main ">Log Out</button>
      </div>
    </div>
    <div className="flex items-center gap-3 mt-5"> <span className="text-2xl text-[#FFF3D5]">Olumide Funitures received</span> <img src="../ngn.svg" className="h-[30px] w-[30px]" /> <span className="text-2xl text-[#FFF3D5]">₦2000 from USDC</span></div>
    </main>
  );
}

export async function getServerSideProps(context: any) {
  
  // Check if user has session cookies
  const { req, res } = context;
  const sessionCookie = req.cookies['myCookie'];
  const allCookies = req.headers.cookie


  if (!sessionCookie) {
    // Redirect the user to the login page or any other page
    res.writeHead(302, { Location: '/' });
    res.end();
    return { props: {} }; // Return empty props since the page will not be rendered
  }

  // Your logic for fetching data
  const data = await decrypt(sessionCookie);

  return {
    props: { data },
  };
}