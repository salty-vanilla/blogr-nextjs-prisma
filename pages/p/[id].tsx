/* eslint-disable react/no-unknown-property */
import React from "react";
import { GetServerSideProps } from "next";
import ReactMarkdown from "react-markdown";
import Router from "next/router";
import { useSession } from "next-auth/react";
import prisma from '@/lib/prisma';
import Layout from "../../components/Layout";
import { PostProps } from "../../components/Post";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const post = await prisma.post.findUnique({
    where: {
      id: String(params.id),
    },
    include: {
      author: {
        select: { name: true, email: true },
      },
    },
  });
  return {
    props: post,
  };
};

const deletePost = async (id: string): Promise<void> => {
  await fetch(`/api/post/${id}`, {
    method: "DELETE",
  });
  Router.push("/");
};

const publishPost = async (id: string): Promise<void> => {
  await fetch(`/api/publish/${id}`, {
    method: "PUT",
  });
  await Router.push("/");
};

function Post(props: PostProps) {
  const { data: session, status } = useSession();
  const { id, content, published, author } = props;
  let { title } = props;
  if (status === "loading") {
    return (
      <div>Authencating ...</div>
    );
  }
  const userHasValidSession = Boolean(session);
  const postBelongsToUser = session?.user?.email === author?.email;

  if (!published) {
    title = `${title} (Draft)`;
  }

  return (
    <Layout>
      <div>
        <h2>{title}</h2>
        <p>By {props?.author?.name || "Unknown author"}</p>
        <ReactMarkdown>{content}</ReactMarkdown>
        {!published && userHasValidSession && postBelongsToUser && (
          <button type="button" onClick={() => publishPost(id)}>Publish</button>
        )}
        {
          userHasValidSession && postBelongsToUser && (
            <button type="button" onClick={() => deletePost(id)}>Delete</button>
          )
        }
      </div>
      <style jsx>{`
        .page {
          background: white;
          padding: 2rem;
        }

        .actions {
          margin-top: 2rem;
        }

        button {
          background: #ececec;
          border: 0;
          border-radius: 0.125rem;
          padding: 1rem 2rem;
        }

        button + button {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  );
}

export default Post;
