

import prisma from "../../../../lib/prisma";
import type { NextApiRequest, NextApiResponse } from 'next'
type ResponseData = {
  NumberOfPaginatedPages: number
}
export default async function handler(req: NextApiRequest, res : NextApiResponse<ResponseData>) {
  interface ID  {
    id?: string
  }
  const id: ID = req.query;
  const LIMIT: number = 10
  const count = await prisma.Comments.count({
    where: {
      ProductId: id.id 
    }
  })
  console.log(count)
  const NumberOfPaginatedPages: number = Math.ceil(count / LIMIT)
  res.status(200).json({ NumberOfPaginatedPages});
}
