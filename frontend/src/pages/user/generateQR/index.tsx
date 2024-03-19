import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form"
import { useState, useEffect, useRef } from "react";
import { useRouter } from 'next/router'
import { createQR } from "../../../utils/createQr";

type Inputs = {
    refrences: string;
    amount: string;
    label: string;
    message: string;
    splToken: string;
    memo: string;
}

export default function User() {
  const [phone, setPhone] = useState('');
  const [hasBank, setHasBank] = useState<boolean>(true)
  const qrRef = useRef<HTMLDivElement>(null)

  const router = useRouter()

  useEffect(() => {
    const qr = createQR(
        'https://phantom.app/ul/browse/https%3A%2F%2Fmagiceden.io%2Fitem-details%2F8yjN8iRuoiYiKW487cnW9vn6mLBR5E8aCNKsBRmTP9vN?ref=https%3A%2F%2Fmagiceden.io', // The Solana Pay URL
        350, // The size of the QR code
        "#09342a" // The background color of the QR code
      );
    
      // Update the ref with the QR code
      if (qrRef.current) {
        qrRef.current.innerHTML = "";
        qr.append(qrRef.current);
      }
  })

  

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm<Inputs>()
      const onSubmit: SubmitHandler<Inputs> = (data) => console.log(Object.assign(data, {phone: phone}));

  return (
    <main
      className={`flex min-h-screen font-main py-5 flex-col text-white bg-[#101010] items-center  px-40`}
    >

    <div className=" w-full flex flex-col py-8 bg-white border-[1px] border-[#24242410] ">
      <div className="flex justify-between text-[#09342a] px-6">
        <div className="flex items-center gap-3"><h2 className="font-main font-bold text-4xl">nomad</h2><div className="bg-green-200 h-7 flex justify-center items-center px-3 rounded-sm"><span className="font-mono text-[#09342a]">ALPHA</span></div></div>    
        <div className="flex flex-col items-end">
            <h4>idasiadiachi@gmail.com</h4>
            <h4 className="text-md ">IFE ASIADIACHI</h4>
        </div>
      </div>
     { hasBank? <>
        <div className="flex mt-6 px-6 justify-center">
        <div className="h-[5rem] flex justify-start w-full bg-[#09342a]">
         <div className="p-4">
            <h3 className="text-xl ">Genrate QR</h3>
            <h3 className="text-md">Note: This Qr code can only be used for a specific amount</h3>
        </div>
       
        </div>
      </div>
     </> : null}

     <div className="flex justify-center">
     <div className="w-[60%]">
     <form onSubmit={handleSubmit(onSubmit)} className="min-w-[400px]">
                    <div className='py-2'>
                        <label className='font-sans flex gap-2 py-2 text-[#09342a] text-xl'><h2>Reference</h2> <div className="bg-green-200 h-7 flex justify-center items-center px-2 rounded-sm"><span className="font-mono text-[0.7rem] text-[#09342a]">OPTIONAL</span></div></label>
                        <input placeholder="e.g 9Xkt75L6YLmfVyNXQyBzM2Cd8PUW6pmUZSk3oyG57cjJ" {...register("refrences")} type="text" className='min-w-[37rem] text-[#09342a] text-lg border-[2px] border-[#09342A] py-3 px-3 focus:outline-none' />
                        {errors.refrences && <span className="text-red-500"> Reference field is required</span>}
                    </div>
                    <div className='py-2'>
                        <label className='font-sans  text-[#09342a] text-xl'>Amount</label>
                        <input {...register("amount", { required: true })} type="number" className='min-w-[37rem] text-[#09342a] text-lg border-[2px] border-[#09342A] py-3 px-3 focus:outline-none' />
                        {errors.amount && <span className="text-red-500">Amount field is required</span>}
                    </div>
                    <div className='py-2'>
                        <label className='font-sans text-[#09342a] text-xl'>Label</label>
                        <input placeholder="e.g Playstation 5 payment" {...register("label")} type="text" className='min-w-[37rem] text-[#09342a] text-lg border-[2px] border-[#09342A] py-3 px-3 focus:outline-none' />
                        {errors.label && <span className="text-red-500">Memo field is required</span>}
                    </div>

                    <div className='py-2'>
                        <label className='font-sans flex gap-2 py-2 text-[#09342a] text-xl'><h2>Message</h2> <div className="bg-green-200 h-7 flex justify-center items-center px-2 rounded-sm"><span className="font-mono text-[0.7rem] text-[#09342a]">OPTIONAL</span></div></label>
                        <input placeholder="e.g collected by..." {...register("message")} type="text" className='min-w-[37rem] text-[#09342a] text-lg border-[2px] border-[#09342A] py-3 px-3 focus:outline-none' />
                        {errors.message && <span className="text-red-500">Message field is required</span>}
                    </div>
                    <div className='py-2'>
                     <label className='font-sans text-[#09342a] text-xl'>Token</label>
                     <select {...register("splToken", { required: true })} className='min-w-[37rem] text-[#09342a] text-lg border-[2px] border-[#09342A] py-3 px-3 focus:outline-none'>
                     <option value="token1" className="h-[30px] rounded-none">USDC</option>
                     {/* Add more options as needed */}
                     </select>
                     {errors.splToken && <span className="text-red-500">This field is required</span>}
                     </div>
                    <div className='py-2'>
                    <label className='font-sans flex gap-2 py-2 text-[#09342a] text-xl'><h2>Memo</h2> <div className="bg-green-200 h-7 flex justify-center items-center px-2 rounded-sm"><span className="font-mono text-[0.7rem] text-[#09342a]">OPTIONAL</span></div></label>
                        <input {...register("memo")} type="text" className='min-w-[37rem] text-[#09342a] text-lg border-[2px] border-[#09342A] py-3 px-3 focus:outline-none' />
                        {errors.memo && <span className="text-red-500">This field is required</span>}
                    </div>

                    <div className='flex pt-2'>
                        <button type="submit" className="bg-[#09342A] text-white min-w-[37rem] px-5 py-3 font-mono transition-transform transform-gpu hover:scale-105">CREATE QR CODE</button>
                    </div>
                </form>
     </div>
     </div>

     
      
     {qrRef && 
                    <div className='py-4 flex justify-center'>
                        <div className="rounded-[2rem]" ref={qrRef} />
                    </div>
                }

      <div className="flex justify-center mt-8">
        <button className="text-[#09342a] text-xl font-main ">Didnt receive a code? Resend.</button>
      </div>
    </div>
    <div className="flex items-center gap-3 mt-5"> <span className="text-2xl text-[#FFF3D5]">Olumide Funitures received</span> <img src="../ngn.svg" className="h-[30px] w-[30px]" /> <span className="text-2xl text-[#FFF3D5]">₦2000 from USDC</span></div>
    </main>
  );
}