import { NextApiRequest, NextApiResponse } from 'next';
import connectMongoDB from '@/lib/MongoConnect';
import Event from '@/models/EmailEventSchema';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      await connectMongoDB();

      // Retrieve events from the database
      const events = await Event.find();

      // Iterate through events and calculate metrics
      let countryCount: any = { US: 0, ES: 0, IT: 0 };
      let deviceCount: any = { desktop: 0, mobile: 0, tablet: 0 };
      // Initialize timeseries with an object for each minute
      let timeseries: { [key: string]: { totalOpens: number; time: string } } =
        {};

      events.forEach((event) => {
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
            deviceCount['mobile']++;
          } else {
            // Other functions to determine if its a desktop or tablet
          }

          if (event.timestamp) {
            // Create a Date object from the Unix timestamp in milliseconds
            const eventTime = new Date(event.timestamp);

            // Set seconds to 0
            eventTime.setSeconds(0);

            // Format the time as needed (e.g., "8/19/2023, 6:48:00 PM")
            const formattedTime = eventTime.toLocaleString();

            // Initialize the timeseries entry if not present
            if (!timeseries[formattedTime]) {
              timeseries[formattedTime] = {
                totalOpens: 0,
                time: formattedTime,
              };
            }

            // Increment totalOpens for the corresponding time
            timeseries[formattedTime].totalOpens++;
          }
        }
      });
      console.log(countryCount);
      console.log(deviceCount);
      console.log(timeseries);

      res.status(200).json({ countryCount, deviceCount, timeseries });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ message: 'Error fetching data from the database' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
