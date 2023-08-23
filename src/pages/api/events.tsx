import { NextApiRequest, NextApiResponse } from 'next';
import connectMongoDB from '@/lib/MongoConnect';
import mongoose from 'mongoose';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(405).send({ msg: "Only POST requests are allowed. This error is located in /src/paes/api/user/set_user.ts" });
    return;
  }

  const event = req.body;

  try {
    await connectMongoDB();

    // Create a new EmailEvent document using the retrieved JSON data
    //const newEvent = new EmailEventModel(event);

    // Save the new event to the database
    //await newEvent.save();

    res.status(201).send("Event saved to MongoDB.");
  } catch (err:any) {
      console.error(err);
      res.status(400).send({ err, msg: 'Something went wrong.' });
  }
}