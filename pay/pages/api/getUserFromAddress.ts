// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { supabase } from "@/utils/supabase";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {

  const { address } = req.query;

  const { data, error } = await supabase.from('users').select('*').eq('nomadVault', address);

  if(!data) return;
  const user = data[0].bankingInfo.account_name

  res.status(200).json({ name: user });
}