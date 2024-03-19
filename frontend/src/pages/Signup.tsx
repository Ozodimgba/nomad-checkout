import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form"
import { PhoneInput } from 'react-international-phone';
import { useState, useEffect } from "react";
import { useRouter } from 'next/router'
import 'react-international-phone/style.css'

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
        <h2 className="text-[#09342a] font-main font-bold text-4xl">Create Account</h2>
      </div>
      <div className="flex mt-2 justify-center">
        <p className="text-[#09342a] font-main">Nomad allows you to collect crypto payments in local currencies</p>
      </div>
      <form className="text-black font-main" onSubmit={handleSubmit(onSubmit)}>
      <div className=" flex mt-8 justify-center my-1">
        <input {...register("email", { required: true})}  placeholder="Enter email" className="min-w-[37rem] text-[#09342a] text-lg border-[2px] border-[#09342A] py-3 px-3 focus:outline-none" />
      </div>
      {errors.email && <span className="text-red-500">Email is required</span>}
      <div className=" flex flex-col mt-2 justify-center items-center my-1">
        <input {...register("fullName", { required: true })} placeholder="Full Name" className="min-w-[37rem] text-[#09342a] text-lg border-[2px] border-[#09342A] py-3 px-3 focus:outline-none" />
        {errors.fullName && <span className="text-red-500">Full name is required</span>}
      </div>
      <div className=" flex mt-2 justify-center">
      <div className="min-w-[37rem] text-[#09342a] text-lg border-[2px] border-[#09342A] py-2">
       <PhoneInput
        defaultCountry="ng"
        style={{width: '36.2rem', paddingLeft: '0.75rem'}}
        inputStyle={{borderWidth: '0px', fontSize: '1.125rem', width: '100%'}}
        countrySelectorStyleProps={{ style: { borderWidth: '0px' }, buttonStyle: { borderWidth: '0px', height: '100%' }}}
        value={phone}
        onChange={(phone) => setPhone(phone)}
      /></div>
      </div>
      <div className=" flex mt-2 justify-center my-1">
        <input {...register("dob")} type="date" id="datePicker" className="min-w-[37rem] text-[#09342a] text-lg border-[2px] border-[#09342A] py-3 px-3 focus:outline-none" />
      </div>
      <div className="w-full mt-3 flex gap-4 justify-center">
      <button type="submit" className="bg-[#09342A] text-white min-w-[37rem] px-5 py-3 font-mono transition-transform transform-gpu hover:scale-105"> CREATE ACCOUNT</button>
      </div>
      </form>
      
      <div className="flex justify-center mt-8">
        <button onClick={() => router.push('./')} className="text-[#09342a] text-xl font-main ">Already have account? Click here to Login</button>
      </div>
    </div>
    <div className="flex items-center gap-3 mt-5"> <span className="text-2xl text-[#FFF3D5]">Olumide Funitures received</span> <img src="ngn.svg" className="h-[30px] w-[30px]" /> <span className="text-2xl text-[#FFF3D5]">₦2000 from USDC</span></div>
    </main>
  );
}