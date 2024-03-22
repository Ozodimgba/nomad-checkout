import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form"
import { PhoneInput } from 'react-international-phone';
import { useState, useEffect } from "react";
import { useRouter } from 'next/router'
import 'react-international-phone/style.css'
import OTPForm from "@/components/OtpForm";
import { decrypt } from "@/lib";

type Inputs = {
    email: string
    fullName: string
    dob: string;
}

export default function CreateAccount() {
  const [phone, setPhone] = useState('');

  const router = useRouter();
  const { email } = router.query;

  const paramEmail = email as unknown as string;

  console.log(email)

  return (
    <main
      className={`flex min-h-screen font-main flex-col text-white bg-[#101010] items-center  px-40`}
    >
      <div>
        <img src="icon.svg" className="w-[150px]" />
      </div>
    <div className=" w-full flex flex-col py-8 bg-white border-[1px] border-[#24242410] ">
      <div className="flex justify-center">
        <h2 className="text-[#09342a] font-main font-bold text-4xl">Verify yourself</h2>
      </div>
      <div className="flex mt-2 justify-center">
        <p className="text-[#09342a] font-main">We just sent a 6 digit code to your email</p>
      </div>
      <div className="w-full flex mt-8 text-[#09342a] justify-center">
      <OTPForm email={paramEmail} router={router} />
      </div>
      <div className="w-full mt-5 flex pb-8 pt-3 gap-4 justify-center">
      <button type="submit" className="bg-[#09342A] min-w-[30rem] px-5 text-xl py-3 font-mono transition-transform transform-gpu hover:scale-105">DIDN&apos;T RECEIVE A CODE? RESEND</button>
      </div>
      {/* <div className="flex justify-center mt-8">
        <button className="text-[#09342a] text-xl font-main ">Didnt receive a code? Resend.</button>
      </div> */}
    </div>
    <div className="flex items-center gap-3 mt-5"> <span className="text-2xl text-[#FFF3D5]">Olumide Funitures received</span> <img src="ngn.svg" className="h-[30px] w-[30px]" /> <span className="text-2xl text-[#FFF3D5]">₦2000 from USDC</span></div>
    </main>
  );
}

export async function getServerSideProps(context: any) {
  
  // Check if user has session cookies
  const { req, res } = context;
  const sessionCookie = req.cookies['myCookie'];
  const allCookies = req.headers.cookie
 


  if (sessionCookie) {
    // Redirect the user to the login page or any other page
    const data = await decrypt(sessionCookie);
    res.writeHead(302, { Location: `/user/${data.user.kycInfo[0].fullName}` });
    res.end();
    return { props: { data } }; // Return empty props since the page will not be rendered
  }

  // Your logic for fetching data
  

  return {
    props: { },
  };
}