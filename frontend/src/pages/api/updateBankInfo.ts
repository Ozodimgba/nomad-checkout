// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import * as OTPAuth from "otpauth";
import axios from 'axios';
import { supabase } from "@/utils/supabase";
import { DatabaseOptions } from "./registerUser";
import { encrypt } from "@/lib";

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

  const { bankInfo, email } = req.body

  //search User secret here using email
  const { data, error } = await supabase.from('users')
  .update({bankingInfo: bankInfo})
  .eq("email", email)
  .select('*')

  if(!data) return;
    const user: DatabaseOptions = data[0] as unknown as DatabaseOptions
  
  const expires = new Date(Date.now() + 30 * 60 * 1000);
  const session = await encrypt({ user, expires });

  // // Respond with a success message or any other data
  res.setHeader('Set-Cookie', `myCookie=${session}; Expires=${expires}; HttpOnly; Secure; Path=/`); 

 if(!error) {
  res.status(200).json({success: true})
 } else {
  res.status(200).json({success: true})
 }  
  
}
