import React from "react";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import Head from "next/head";
import { getPostNames, getPostContent } from "../../lib/post";

export async function getStaticPaths() {
  const posts = await getPostNames();
  const returnified = posts.map((item) => {
    return { params: { id: item } };
  });

  return {
    paths: returnified,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const fileData = await getPostContent(params.id);

  return {
    props: {
      title: params.id,
      content: fileData,
    },
  };
}

export default function Page({ title, content }) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div>
        <Link href="/">
          <a>← home</a>
        </Link>
      </div>
      <div>
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </>
  );
}
