/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/no-unknown-property */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";

export type PostProps = {
  id: string;
  title: string;
  author: {
    name: string;
    email: string;
  } | null;
  content: string;
  published: boolean;
};

function Post(props: { post: PostProps }) {
  const { post } = props;
  const { author, id, title, content } = post;
  const authorName = author ? author.name : "Unknown author";
  return (
    <div onClick={() => Router.push("/p/[id]", `/p/${id}`)}>
      <h2>{title}</h2>
      <small>By {authorName}</small>
      <ReactMarkdown>
        {content}
      </ReactMarkdown>
      <style jsx>{`
        div {
          color: inherit;
          padding: 2rem;
        }
      `}</style>
    </div>
  );
}

export default Post;
