import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const event = req.body;


    // process event to store in mongoDB



    res.status(201).json({ message: 'Event received and stored' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
