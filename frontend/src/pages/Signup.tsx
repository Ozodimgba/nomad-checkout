import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form"
import { PhoneInput } from 'react-international-phone';
import { useState, useEffect } from "react";
import { useRouter } from 'next/router'
import 'react-international-phone/style.css'
import axios from "axios";
import Loader from "@/components/Loader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Inputs = {
    email: string
    fullName: string
    dob: string;
}

interface LoadingStates {
  [buttonId: string]: boolean; 
}

export default function CreateAccount() {
  const [phone, setPhone] = useState('');
  const [loadingStates, setLoadingStates] = useState<LoadingStates>({ 
    signUp: false,
  });

  const router = useRouter()

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm<Inputs>()

      const onSubmit: SubmitHandler<Inputs> = (data) => {
        setLoadingStates((prevState) => ({ ...prevState, signUp: true }));
        const payload = Object.assign(data, {phone: phone});
        axios.post('api/registerUser', payload)
  .then(response => {
    console.log('Response:', response.data);
    if (response.status >= 200 && response.status < 300) {
      // Success handling
      const notify = () => toast("Your account has been created. We sent you an email!", {
        style: {
          background: "#09342a",
          color: "white",
          fontSize: "1rem",
          borderRadius: 0
        },
        progressStyle: {
          background: "white",
          height: "4px"
        }
      });
      notify();
    } else {
      // Server returned an error status
      const notify = () => toast("An error occurred while creating your account", {
        style: {
          background: "#ac0816",
          color: "white",
          fontSize: "1rem",
          borderRadius: 0
        },
        progressStyle: {
          background: "white",
          height: "4px"
        }
      });
      notify();
    }
  })
  .catch(error => {
    // Axios or network error occurred
    console.error('Error:', error.message);
    const notify = () => toast("An error occurred while creating your account", {
      style: {
        background: "#ac0816",
        color: "white",
        fontSize: "1rem",
        borderRadius: 0
      },
      progressStyle: {
        background: "white",
        height: "4px"
      }
    });
    notify();
  }).finally(() => setLoadingStates((prevState) => ({ ...prevState, signUp: false })))
        
      };

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
      <div className="min-w-[37rem] text-[#09342a] bg-white text-lg border-[2px] border-[#09342A] py-2">
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
      <button type="submit" className="bg-[#09342A] text-white min-w-[37rem] px-5 py-3 flex justify-center font-mono transition-transform transform-gpu hover:scale-105"> {loadingStates.signUp? <Loader className="h-6" />: 'CREATE ACCOUNT'} </button>
      </div>
      </form>
      <ToastContainer />
      <div className="flex justify-center mt-8">
        <button onClick={() => router.push('./')} className="text-[#09342a] text-xl font-main ">Already have account? Click here to Login</button>
      </div>
    </div>
    <div className="flex items-center gap-3 mt-5"> <span className="text-2xl text-[#FFF3D5]">Olumide Funitures received</span> <img src="ngn.svg" className="h-[30px] w-[30px]" /> <span className="text-2xl text-[#FFF3D5]">₦2000 from USDC</span></div>
    </main>
  );
}

