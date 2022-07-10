import prisma from "../../../../lib/prisma";
import type { NextApiRequest, NextApiResponse } from 'next'
import FavsInfo from "./interfaceFacs";

type ResponseData = {
  prodcs: FavsInfo[]
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  const { pid }: {[key: string]: any} = req.query;
    let prodcs: FavsInfo[] = await prisma.UserFavourite.findMany({
      where: {
        UserId: pid,
      },
    });
    console.log(prodcs);
  res.status(200).json({ prodcs });
}
