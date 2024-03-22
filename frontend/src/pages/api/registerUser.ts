// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import * as OTPAuth from "otpauth";
import { supabase } from "@/utils/supabase";
import { EmailTemplate } from '../../components/emails/otp';
import * as speakeasy from 'speakeasy';
import { Resend } from 'resend';
import axios from "axios";

type Data = {
  success: boolean;
};

type KycData = {
  fullName: string;
  phoneNumber: string;
  dob: string;
}

export interface DatabaseOptions {
  email: string;
  nomadVault: string;
  otpSecret: string;
  bankingInfo: null;
  kycInfo: KycData[];
  verified: boolean;
}

const resend = new Resend('re_TEJRDjdg_Kcjzxu6u2cVbsUqS2SFtErpK');

interface ReqData {
  email: string,
  fullName: string,
  dob: string,
  phone: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {

  const { email, fullName, dob, phone }: ReqData = req.body
  const secret = speakeasy.generateSecret()

  try {

    let totp = new OTPAuth.TOTP({
      issuer: "Nomad",
      label: "verify",
      algorithm: "SHA1",
      digits: 6,
      period: 63,
      secret: secret.base32, // or 'OTPAuth.Secret.fromBase32("NB2W45DFOIZA")'
    });
  
    const vault = axios.get('https://3001-ozodimgba-nomadcheckout-ofv3uqpm6fa.ws-eu110.gitpod.io/generateNewVault')
  
    const InsertOptions: DatabaseOptions = {
      email: email,
      nomadVault: (await vault).data,
      otpSecret: secret.base32,
      bankingInfo: null,
      kycInfo: [{
          fullName: fullName,
          phoneNumber: phone,
          dob: dob,
  
      }],
      verified: false
    }
    console.log(InsertOptions)
    //store user information in supabase
    const { data, error } = await supabase.from('users').insert(InsertOptions)
     console.log("error: " + JSON.stringify(error))

     console.log("data: " + data)
     //generate OTP token
     let token = totp.generate();
     const firstName = fullName.split(' ')
     console.log(firstName[0])
  
  //   let delta = totp.validate({ token: token, window: 1 });
  
  //   const validate = totp.validate({ token })
  try {
    const { data, error } = await resend.emails.send({
        from: 'Verify your Nomad Account <info@usenomad.xyz>',
        to: [email],
        subject: 'First Step',
        react: EmailTemplate({ name: firstName[0], otpCode: token }),
        text: 'Verify your Nomad Account', // Add this line
      });
    res.status(200).json({ success: true});
  } catch(err) {
   res.status(500).json({ success: false})
  }

  } catch(err) {
    console.log(err)
    res.status(500).json({ success: false})
  }

};