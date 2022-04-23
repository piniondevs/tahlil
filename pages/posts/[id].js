import React from "react";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import Head from "next/head";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nightOwl as theme } from "react-syntax-highlighter/dist/cjs/styles/prism/";
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
        <meta name="description" content="A post made on tahlils site." />
      </Head>
      <div>
        <Link href="/">
          <a>← home</a>
        </Link>
      </div>
      <div>
        <ReactMarkdown
          children={content}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              return !inline && match ? (
                <SyntaxHighlighter
                  children={String(children).replace(/\n$/, "")}
                  style={theme}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                />
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        />
      </div>
    </>
  );
}
