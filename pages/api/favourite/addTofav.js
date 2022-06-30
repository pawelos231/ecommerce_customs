import prisma from "../../../lib/prisma";
export default async function handler(req, res) {
  const data = req.body;
  if (req.method == "POST") {
    const SendUserFavourite = async () => {
      const post = await prisma.UserFavourite.create({
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
