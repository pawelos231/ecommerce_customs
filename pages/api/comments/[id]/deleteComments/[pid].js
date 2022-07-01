import prisma from "../../../../../lib/prisma";
export default async function handler(req, res) {
  const { pid, id } = req.query;
  const sendDelete = async () => {
    const deleteComment = await prisma.Comments.deleteMany({
      where: {
        id: id,
        UserId: pid,
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
