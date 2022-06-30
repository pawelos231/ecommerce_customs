import prisma from "../../../../lib/prisma";
export default async function handler(req, res) {
  const { id } = req.query;
  const comment = await prisma.Comments.findMany({
    where: { ProductId: id },
  });
  res.status(200).json({ comment });
}
