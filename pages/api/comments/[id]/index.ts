import prisma from "../../../../lib/prisma";
import type { NextApiRequest, NextApiResponse } from 'next'
export default async function handler(req: NextApiRequest, res : NextApiResponse) {
  interface ID  {
    id?: string
  }
  interface userInfo {
    id: string,
    createdAt: Date,
    productId: string,
    Author: string, 
    Photo: string,
    Content: string
  }
  const id: ID = req.query;
  const comment: userInfo[] = await prisma.Comments.findMany({
    where: { ProductId: id.id },
  });
  res.status(200).json({ comment });
}
