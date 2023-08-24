import { NextApiRequest, NextApiResponse } from 'next';
import connectMongoDB from '@/lib/MongoConnect';
import Event from '@/models/EmailEventSchema';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      await connectMongoDB();

      // Retrieve events from the database
      const events = await Event.find();

      // Iterate through events and calculate metrics
      let countryCount:any = {};

      events.forEach(event => {
        // Check if the event has geo_ip and country attributes
        if (event.geo_ip && event.geo_ip.country) {
          const country = event.geo_ip.country;

          // Count and accumulate the country occurrences
          if (countryCount[country]) {
            countryCount[country]++;
          } else {
            countryCount[country] = 1;
          }
        }
      });
      console.log(countryCount)

      res.status(200).json({ countryCount });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error fetching data from the database' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
