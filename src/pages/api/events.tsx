import { NextApiRequest, NextApiResponse } from 'next';
import connectMongoDB from "@/lib/MongoConnect";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(405).send({ msg: "Only POST requests are allowed. This error is located in /src/paes/api/user/set_user.ts" });
    return;
  }

  const event = req.body;

  try {
    await connectMongoDB();
    res.status(201).send("201");
  } catch (err:any) {
      console.error(err);
      res.status(400).send({ err, msg: 'Something went wrong.' });
  }
}