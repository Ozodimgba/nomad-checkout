import Image from "next/image";
import { DM_Sans } from "next/font/google";
import { Router, useRouter } from "next/router";
import { decrypt } from '@/lib'
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { useEffect } from "react";
import { banks } from "./banks";
import Select from 'react-select';
import * as stringComparison from 'string-comparison';
import React from "react";

const dm = DM_Sans({ subsets: ["latin"] });

type Inputs = {
  email: string
}

type BankID = { value: any; label: any; }

interface ReslvdData {
  account_name: string;
  account_number: string;
  bank_name: string
  bank_id: number;
}


export default function AddBank({session}: any) {
  const [apiBanks, setApiBanks] = React.useState<[]>([]);
  const [ bankName, setBankName] = React.useState<any>();
  const [ accountNumber, setAccountNumber] = React.useState<string>('');
  const [ isResolved, setIsResolved] = React.useState<boolean>(false);
  const [resolvedData, setResolvedData] = React.useState<ReslvdData>()
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
  };

  useEffect(() => {
    const bearerToken = 'test.sc.ey65f1a83706b7b6cfe0fb766965f1a83706b7b6cfe0fb766a65f1a83706b7b6cfe0fb766b'; // Replace with your actual token

    axios.get('https://ramp.scalex.africa/business/banks', {
        headers: {
            'Authorization': `Bearer ${bearerToken}`
        }
    })
    .then((res) => {setApiBanks(res.data.data.banks)})
    .catch((error) => console.error('Error fetching data:', error));
}, []); 


  // Map banks array to options format required by react-select
  const options = apiBanks.map((bank: any) => ({ value: bank.code, label: bank.name }));

  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      outline: 'none', // Remove outline on focus
      // Add more custom styles as needed
    }),
  };

  const handleBankResolve = () => {

    const bearerToken = 'test.sc.ey65f1a83706b7b6cfe0fb766965f1a83706b7b6cfe0fb766a65f1a83706b7b6cfe0fb766b'; // Replace with your actual token
    const data = {
      account_number: accountNumber,
      bank_code: bankName.value
    }
    axios.post(`https://ramp.scalex.africa/business/bank/resolve`, data,{
      headers: {
          'Authorization': `Bearer ${bearerToken}`
      }
  })
  .then((res) => {setResolvedData(res.data.data); setIsResolved(true)})
  .catch((error) => console.error('Error fetching data:', error));
  }

  const saveBankInfo = () => {
    const bankInfo = resolvedData;
    const email = session?.user.email;
    const data = {
      email,
      bankInfo,
    }
    axios.post(`https://3000-ozodimgba-nomadcheckout-ofv3uqpm6fa.ws-eu110.gitpod.io/api/updateBankInfo`, data, {})
     .then(res => router.replace(`/user/${email}`))
  }


  return (
    <main
      className={`flex min-h-screen flex-col text-white bg-black items-center  px-40 ${dm.className}`}
    >
      <div>
        <img src="../icon.svg" className="w-[150px]" />
      </div>
    <div className=" w-full flex flex-col py-8 bg-white border-[1px] border-[#24242410] ">
      {isResolved? <>
      <div className="flex justify-center">
        <h2 className="text-[#09342a] font-main font-bold text-4xl">Is this your bank name?</h2>
      </div>
      <div className="flex mt-8 px-[10%] justify-center">
        <h3 className="text-[#09342a] text-sm text-center font-main ">{resolvedData?.bank_name.toUpperCase()}</h3>
      </div>
      <div className="flex mt-2 px-[10%] justify-center">
        <h3 className="text-[#09342a] text-xl text-center font-main ">{resolvedData?.account_number}</h3>
      </div>
      <div className="flex mt-2 px-[10%] justify-center">
        <h3 className="text-[#09342a] text-3xl text-center font-main ">{resolvedData?.account_name}</h3>
      </div>
      <div className="w-full mt-5 flex gap-4 justify-center">
      <button onClick={saveBankInfo} className="bg-[#09342A] min-w-[30rem] px-5 text-xl py-3 font-mono transition-transform transform-gpu hover:scale-105">YES, IT&apos;S ME</button>
      </div>
      <div className="w-full mt-3 flex gap-4 justify-center">
      <button onClick={() => setIsResolved(false)} className="relative text-[#09342A] text-xl font-mono min-w-[30rem] px-5 py-3 transition-transform transform-gpu hover:scale-105">
     <span className="absolute inset-0 border-[2px] border-[#09342A]"></span>
     NO, IT&apos;S NOT ME 
    </button>
    </div>
      </>: 
      <>
      <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-center">
        <h2 className="text-[#09342a] font-main font-bold text-4xl">Add your bank account</h2>
      </div>
      <div className="flex mt-2 px-[10%] justify-center">
        <p className="text-[#09342a] text-center font-main ">You can only add one bank account to this nomad account. But chillax you can change the bank account afterwards</p>
      </div>
      <div className=" flex mt-8 justify-center my-1">
        <div className="min-w-[37rem] w-[37rem] text-[#09342a] text-lg border-[2px] border-[#09342A] py-2 ">
        <Select
        {...register('email', { required: true })}
        options={options}
        unstyled
        placeholder="Select Bank"
        classNames={{
            control: () => "px-3",
            option: () => "bg-white px-3 py-3"
          }}
        onChange={(selectedOption) => setBankName(selectedOption)} // Example onChange handler
      />
      </div>
      </div>
      <div className=" flex mt-3 justify-center my-1">
        <input onChange={(e) => setAccountNumber(e?.target.value)}  placeholder="Account number" className="min-w-[37rem] text-[#09342a] text-lg border-[2px] border-[#09342A] py-3 px-3" />
      </div>
      <div className="w-full mt-5 flex gap-4 justify-center">
      <button onClick={handleBankResolve}  className="bg-[#09342A] min-w-[18rem] px-5 py-3 font-mono transition-transform transform-gpu hover:scale-105">VERIFY MY BANK NAME</button>
      </div>
      </form>
      </>}
      
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
  console.log(await decrypt(sessionCookie))
  const dd = await decrypt(sessionCookie)
  console.log(dd.user.kycInfo[0].fullName)


  if (!sessionCookie) {
    // Redirect the user to the login page or any other page
    res.writeHead(302, { Location: '/Signup' });
    res.end();
    return { props: {} }; // Return empty props since the page will not be rendered
  }

  // Your logic for fetching data
  const session = await decrypt(sessionCookie);

  return {
    props: { session },
  };
}

