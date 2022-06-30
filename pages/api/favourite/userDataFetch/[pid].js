import prisma from "../../../../lib/prisma";
export default async function handler(req, res) {
  const { pid } = req.query;
  let prodcs;
  const fetchAllProdcs = async () => {
    prodcs = await prisma.UserFavourite.findMany({
      where: {
        UserId: pid,
      },
    });
    console.log(prodcs);
  };
  const init = async () => {
    await fetchAllProdcs();
  };
  await init();
  res.status(200).json({ prodcs });
}
