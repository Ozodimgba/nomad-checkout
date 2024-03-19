import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form"
import { PhoneInput } from 'react-international-phone';
import { useState, useEffect } from "react";
import { useRouter } from 'next/router'
import 'react-international-phone/style.css'
import OTPForm from "@/components/OtpForm";

type Inputs = {
    email: string
    fullName: string
    dob: string;
}

export default function CreateAccount() {
  const [phone, setPhone] = useState('');

  const router = useRouter()

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm<Inputs>()
      const onSubmit: SubmitHandler<Inputs> = (data) => console.log(Object.assign(data, {phone: phone}));

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
      <OTPForm />
      </div>
      
      <div className="flex justify-center mt-8">
        <button className="text-[#09342a] text-xl font-main ">Didnt receive a code? Resend.</button>
      </div>
    </div>
    <div className="flex items-center gap-3 mt-5"> <span className="text-2xl text-[#FFF3D5]">Olumide Funitures received</span> <img src="ngn.svg" className="h-[30px] w-[30px]" /> <span className="text-2xl text-[#FFF3D5]">₦2000 from USDC</span></div>
    </main>
  );
}