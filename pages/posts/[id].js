import React from "react";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import Head from "next/head";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nightOwl as theme } from "react-syntax-highlighter/dist/cjs/styles/prism/";
import { getPostMeta, getPostContent } from "../../lib/post";

export async function getStaticPaths() {
  const data = await getPostMeta();
  const paths = data.map((item) => {
    return { params: { id: item.slug } };
  });

  return {
    paths: paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const fileData = await getPostContent(params.id);
  return {
    props: {
      title: fileData.data.title,
      description: fileData.data.description,
      content: fileData.content,
    },
  };
}

export default function Page({ title, description, content }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <div>
        <Link href="/">
          ← home
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
