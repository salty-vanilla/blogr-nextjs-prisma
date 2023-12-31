/* eslint-disable react/no-unknown-property */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/function-component-definition */
import React from 'react';
import { type GetStaticProps } from 'next';
import prisma from '@/lib/prisma';
import Layout from '../components/Layout';
import Post, { type PostProps } from '../components/Post';

export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  return {
    props: { feed },
    revalidate: 10,
  };
};

interface Props {
  feed: PostProps[]
}

const Blog: React.FC<Props> = (props) => (
    <Layout>
      <div className="page">
        <h1>Public Feed</h1>
        <main>
          {props.feed.map((post) => (
            <div key={post.id} className="post">
              <Post post={post} />
            </div>
          ))}
        </main>
      </div>
      <style jsx>{`
        .post {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }

        .post:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .post + .post {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  );

export default Blog;
