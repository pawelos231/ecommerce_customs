import prisma from "../../../lib/prisma";
import type { NextApiRequest, NextApiResponse } from 'next'
import {POST} from '../../../constants/FetchDataMethods'
import FavsInfo from '../../../interfaces/interfaces';
type ResponseData = {
  text: string
}
export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  const data = req.body;
  if (req.method == POST) {
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
  res.status(200).json({ text: "success in adding your favorite product!"});
}
