// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import * as OTPAuth from "otpauth";
import axios from 'axios';
import middleware from "./middleware";

type Data = {
  name: any;
};

function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {

  let totp = new OTPAuth.TOTP({
    issuer: "Nomad",
    label: "verify",
    algorithm: "SHA1",
    digits: 6,
    period: 63,
    secret: "NB2W45DFOIZI", // or 'OTPAuth.Secret.fromBase32("NB2W45DFOIZA")'
  });

  let token = totp.generate();

  let delta = totp.validate({ token: '22332', window: 1 });

  const validate = totp.validate({ token })

  res.status(200).json({ name: req.body });
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function (req: NextApiRequest, res: NextApiResponse) {
  // Apply middleware to this route
  middleware(req, res, () => {
    req.body = { number: 40 }
    handler(req, res);
  });
}
