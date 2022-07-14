import prisma from "../../../lib/prisma";
import type { NextApiRequest, NextApiResponse } from 'next'
import FavsInfo from "./userDataFetch/_interfaceFacs";
export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const data = req.body;
  if (req.method == "POST") {
    const SendUserFavourite = async () => {
      const post: FavsInfo = await prisma.UserFavourite.create({
        data: JSON.parse(data),
      });
      console.log(post);
    };
    const init = async () => {
      await SendUserFavourite();
    };
    await init();
  }
  res.status(200).json({ data });
}
