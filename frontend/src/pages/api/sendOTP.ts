// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { EmailTemplate } from '../../components/emails/login';
import * as OTPAuth from "otpauth";
import { supabase } from "@/utils/supabase";
import { DatabaseOptions } from "./registerUser";
import { Resend } from 'resend';


const resend = new Resend('re_TEJRDjdg_Kcjzxu6u2cVbsUqS2SFtErpK');
type Data = {
  success: any,
};



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {

  const { email } = req.body

  //retrieve secret from db
  const { data, error } = await supabase.from('users').select('*').eq('email', email);
  //generate otp
  if(!data) return;
  const user: DatabaseOptions = data[0] as unknown as DatabaseOptions

  if(user){
    let totp = new OTPAuth.TOTP({
      issuer: "Nomad",
      label: "verify",
      algorithm: "SHA1",
      digits: 6,
      period: 63,
      secret: user.otpSecret, // or 'OTPAuth.Secret.fromBase32("NB2W45DFOIZA")'
    });

   let token =  totp.generate()
  
    const fullName =  user.kycInfo[0].fullName
   const firstName = fullName.split(' ')
    console.log(firstName[0])

   try {
    const { data, error } = await resend.emails.send({
        from: 'Login into your Nomad account <info@usenomad.xyz>',
        to: [user.email],
        subject: 'Login Code',
        react: EmailTemplate({ name: firstName[0], otpCode: token }),
        text: 'Login into Nomad checkout', // Add this line
      });
    res.status(200).json({ success: true});
  } catch(err) {
   res.status(500).json({ success: false})
  }
  }
    
}
