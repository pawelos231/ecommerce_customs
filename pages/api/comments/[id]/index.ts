import prisma from "../../../../lib/prisma";
import type { NextApiRequest, NextApiResponse } from 'next'
import userInfo from '../../../../interfaces/interfaces'
export default async function handler(req: NextApiRequest, res : NextApiResponse) {
  interface ID  {
    id?: string
  }
  const id: ID = req.query;
  const comment: userInfo[] = await prisma.Comments.findMany({
    where: { ProductId: id.id },
  });
  res.status(200).json({ comment });
}
