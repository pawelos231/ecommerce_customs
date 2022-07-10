import prisma from "../../../../../lib/prisma";
import type { NextApiRequest, NextApiResponse } from 'next'
type ResponseData = {
  text: string
}
export default async function handler(req: NextApiRequest, res : NextApiResponse<ResponseData>) {
  interface IDS {
    id?: string,
    pid?: string
  }
  const identities: IDS = req.query;
  const sendDelete = async () => {
    const deleteComment = await prisma.Comments.deleteMany({
      where: {
        id: identities.id,
        UserId: identities.pid,
      },
    });
    console.log(deleteComment);
  };
  const init = async () => {
    await sendDelete();
  };
  await init();
  res.status(200).json({ text: "Sucessfully deleted" });
}
