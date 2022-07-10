import prisma from "../../../lib/prisma";
import type { NextApiRequest, NextApiResponse } from 'next'
type ResponseData = {
  text: string
}
export default async function handler(req: NextApiRequest, res:NextApiResponse<ResponseData> ) {
  if (req.method == "DELETE") {
    const { id } : {[key: string]: any} = req.query;
    interface Count{
      count: number
    }
    const deleteFavouiriteDataInfo = async () => {
      const deleteFav: Count = await prisma.UserFavourite.deleteMany({
        where: {
            Unique: id,
        },
      });
      console.log(deleteFav);
    };
    const initi = async () => {
      await deleteFavouiriteDataInfo();
    };
    await initi();
  }
  res.status(200).json({ text: 'Success in deleting fav !' })
}
