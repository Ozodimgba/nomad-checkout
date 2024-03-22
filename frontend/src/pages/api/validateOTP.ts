// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import * as OTPAuth from "otpauth";
import axios from 'axios';
import { supabase } from "@/utils/supabase";
import { DatabaseOptions } from "./registerUser";

type Data = {
  success: boolean;
};

interface ReqData {
    email: string;
    otpcode: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {

  const { email, otpCode } = req.body

  //search User secret here using email
  const { data, error } = await supabase.from('users').select('*').eq('email', email);
  //generate otp
  if(!data) return;
  const user: DatabaseOptions = data[0] as unknown as DatabaseOptions

  let totp = new OTPAuth.TOTP({
    issuer: "Nomad",
    label: "verify",
    algorithm: "SHA1",
    digits: 6,
    period: 63,
    secret: user.otpSecret, // or 'OTPAuth.Secret.fromBase32("NB2W45DFOIZA")'
  });

  let token = totp.generate();

  let delta = totp.validate({ token: '456790', window: 1 });

  const validate = totp.validate({ token: '115882' })
  

  if(validate !== null) {
    res.status(200).json({ success: true });
  } else {
    res.status(200).json({ success: false });
  }

  
}
