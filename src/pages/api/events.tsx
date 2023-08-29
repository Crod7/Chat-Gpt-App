import { NextApiRequest, NextApiResponse } from 'next';
import connectMongoDB from '@/lib/MongoConnect';
import Event from '@/models/EmailEventSchema';

//Recieves only json in POST req and saves to mongoDB
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.status(405).send({
      msg: 'Only POST requests are allowed. This error is located in events.tsx in api folder',
    });
    return;
  }

  const { event } = req.body;

  try {
    await connectMongoDB();

    // This is the event being saved to mongoDB
    const createdEvent = await Event.create(event);

    res.status(201).send(`Event saved to MongoDB: ${createdEvent}`);
  } catch (err: any) {
    console.error(err);
    res.status(400).send({ err, msg: 'Something went wrong.' });
  }
}
