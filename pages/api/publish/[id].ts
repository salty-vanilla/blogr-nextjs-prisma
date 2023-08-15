import { NextApiRequest } from "next";
import prisma from "@/lib/prisma";

interface Request extends NextApiRequest {
  query: {
    id: string,
  }
}

async function handle(req: Request, res) {
  const postId = req.query.id;
  const post = await prisma.post.update({
    where: { id: postId },
    data: { published: true },
  });
  res.json(post);
}

export default handle;
