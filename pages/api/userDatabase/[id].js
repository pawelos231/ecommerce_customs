import prisma from "../../../lib/prisma";
export default async function handler(req, res) {
  const { id } = req.query;
  console.log(id);
  const data = await prisma.users.findRaw({
    filter: {
      _id: { $eq: { $oid: id } },
    },
  });

  res.status(200).json({ data });
}
