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
      let countryCount:any = {US: 0, ES: 0, IT: 0};
      let deviceCount: any = {desktop: 0, mobile: 0, tablet: 0};
      let timeseries:any = [];

      events.forEach(event => {
        // Check if the event has geo_ip and country attributes
        if (event.geo_ip && event.geo_ip.country && event.user_agent_parsed) {
          const country = event.geo_ip.country;
          const device = event.user_agent_parsed.is_mobile;

          // Count and accumulate the country occurrences
          if (countryCount[country]) {
            countryCount[country]++;
          } else {
            countryCount[country] = 1;
          }

          // Count and accumulate the device occurrences
          if (device) {
            deviceCount["mobile"]++;
          } else{
            // Other functions to determine if its a desktop or tablet
          }





        }
      });
      console.log(countryCount)
      console.log(deviceCount)

      res.status(200).json({ countryCount, deviceCount });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error fetching data from the database' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
