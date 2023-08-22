import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {


        
      // aggregate events data and calculate metrics




      const avgTimePerEmail = 'placeholder';
      res.json({ avgTimePerEmail });
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  }
  