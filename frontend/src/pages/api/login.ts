// pages/api/login.js
import { SignJWT, jwtVerify } from 'jose';
import { NextApiRequest, NextApiResponse } from 'next';
import { getCookies, setCookie } from 'cookies-next';
import { supabase } from '@/utils/supabase';
import * as OTPAuth from "otpauth";
import { DatabaseOptions } from './registerUser';

const secretKey = "secret";
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("10 hours from now")
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { email, otpCode } = req.body;

    const { data, error } = await supabase.from('users').select('*').eq('email', email);

    // const allCookies = req.headers.cookie; 
    if(!data) return;
    const user: DatabaseOptions = data[0] as unknown as DatabaseOptions
    // // Create the session
    let totp = new OTPAuth.TOTP({
      issuer: "Nomad",
      label: "verify",
      algorithm: "SHA1",
      digits: 6,
      period: 63,
      secret: user.otpSecret, // or 'OTPAuth.Secret.fromBase32("NB2W45DFOIZA")'
    });
  
    const validate = totp.validate({ token: otpCode })
    
  
    
    const expires = new Date(Date.now() + 30 * 60 * 1000);
    const session = await encrypt({ user, expires });

    // // Respond with a success message or any other data
    res.setHeader('Set-Cookie', `myCookie=${session}; Expires=${expires}; HttpOnly; Secure; Path=/`); 
    // const check = await decrypt(session)

    if(validate !== null) {
      res.status(200).json({ session: session });
    } else {
      res.status(200).json({ success: false });
    }
    
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'An error occurred during login' });
  }
}
