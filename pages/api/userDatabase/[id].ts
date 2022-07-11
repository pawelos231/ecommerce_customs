import prisma from "../../../lib/prisma";
import type { NextApiRequest, NextApiResponse } from 'next'
type Response =  {
  data: string
}
export default async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  const { id }: {[key: string]: any} = req.query;
  console.log(id);
  const data: string = await prisma.users.findRaw({
    filter: {
      _id: { $eq: { $oid: id } },
    },
  });
  console.log(data)

  res.status(200).json({ data });
}
