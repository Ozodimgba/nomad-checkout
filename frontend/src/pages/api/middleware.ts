// pages/api/middleware.ts

import { NextApiRequest, NextApiResponse } from 'next';

const middleware = (req: NextApiRequest, res: NextApiResponse, next: () => void) => {
  console.log('Middleware executed', );
  next(); // Call next to proceed to the actual API handler
};

export default middleware;

 