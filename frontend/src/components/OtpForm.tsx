import axios from 'axios';
import { NextRouter } from 'next/router';
import React, { useState, useRef, ChangeEvent } from 'react';

interface FormProps {
  email: string;
  router: NextRouter
}

const OTPForm: React.FC<FormProps> = ({ email, router }) => {
  const [otp, setOTP] = useState<string[]>(['', '', '', '', '', '']);
  const otpInputs = useRef<HTMLInputElement[]>([]);

  const handleChange = (index: number, value: string) => {
    if (!isNaN(parseInt(value)) && value.length <= 1) {
      const updatedOTP = [...otp];
      updatedOTP[index] = value;
      setOTP(updatedOTP);
      
      if (index < 5) {
        otpInputs.current[index + 1].focus();
      }
    }
  };

  React.useEffect(() => {
    if (otp.every(code => code !== '')) {
      const otpCode = otp.join(''); // Log all values as a single string

      const data = {
        email,
        otpCode
      }
      axios.post('api/login', data).then(res => {
        if(res.data.session){
          router.reload()
        }
      })
    }
  },[otp, email])

  const handleKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace') {
      const updatedOTP = [...otp];
      updatedOTP[index] = '';
      setOTP(updatedOTP);
      
      if (index > 0) {
        otpInputs.current[index - 1].focus();
      }
    }
  };


  return (
    <div className='flex gap-3 min-h-[60px] bg-white'>
      
      {otp.map((value, index) => (
        <div key={index} className='w-[50px] flex justify-center items-center border-[2px] border-green-950 max-h-[50px]'>
        <input
          type="text"
          maxLength={1}
          className='w-full max-w-[15px] text-2xl focus:outline-none'
          value={value}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(index, e.target.value)}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => handleKeyDown(index, e)}
          ref={(input) => {
            otpInputs.current[index] = input as HTMLInputElement;
          }}
        />
        </div>
      ))}
    </div>
  );
};

export default OTPForm;
