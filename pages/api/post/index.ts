import { getSession } from "next-auth/react";
import { NextApiRequest, NextApiResponse } from "next";
import { Post } from "@prisma/client";
import prisma from "@/lib/prisma";

interface Request extends NextApiRequest{
  body: {
    title: string;
    content?: string;
  }
}

export default async function handle(
  req: Request,
  res: NextApiResponse<Post>,
) {
  const { title, content } = req.body;

  const session = await getSession( { req });
  const result = await prisma.post.create({
    data: {
      title,
      content,
      author: { connect: { email: session?.user?.email }},
    },
  });
  res.json(result);
}
