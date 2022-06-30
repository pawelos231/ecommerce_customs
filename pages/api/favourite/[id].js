import prisma from "../../../lib/prisma";
export default async function handler(req, res) {
  if (req.method == "DELETE") {
    const { id } = req.query;
    const deleteFavouiriteDataInfo = async () => {
      const deleteFav = await prisma.UserFavourite.deleteMany({
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
  res.status(200).json({ name: 'John Doe' })
}
