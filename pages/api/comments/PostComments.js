import prisma from "../../../lib/prisma";
export default async function handler(req, res) {
  const data = req.body;
  const parsedobj = JSON.parse(data);
  console.log(data);
  const postMessageCom = async () => {
    const post = await prisma.Comments.create({
      data: JSON.parse(data),
    });
    console.log(post);
  };
  const init = async () => {
    await postMessageCom();
  };
  await init();
  res.status(200).json({ name: "John Doe" });
}
