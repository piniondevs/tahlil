import React from "react";
import Link from "next/link";
import Head from "next/head";
import { getPostMeta } from "../lib/post";

export async function getStaticProps() {
  const data = await getPostMeta();
  data.sort((a, b) => b.index - a.index);
  return {
    props: {
      data,
    },
  };
}

export default function Home({ data }) {
  const socials = [
    { name: "Email", url: "mailto:realtahlil@gmail.com?Subject=Hello" },
    { name: "GitHub", url: "https://github.com/tahlilma" },
    {
      name: "StackOverflow",
      url: "https://stackoverflow.com/users/14071354/bruh-moment",
    },
    { name: "Instagram", url: "https://www.instagram.com/ta_hlil/" },
  ];

  return (
    <div>
      <Head>
        <title>Home</title>
        <meta name="description" content="Tahlils personal site." />
      </Head>
      <h1>Hi</h1>
      <p>
        My name's <strong>Tahlil</strong>. I'm a self proclaimed software
        developer and I mainly work on mobile apps, websites and Discord bots. I
        also do other stuff from time to time.
      </p>

      <h2>Contact Me:</h2>
      {socials.map((item) => {
        return (
          <div className="link-container">
            <a href={item.url}>{item.name}</a>
          </div>
        );
      })}

      <h2>Blog Posts:</h2>
      {data.map((item) => {
        return (
          <div className="link-container">
            <Link href={`/posts/${encodeURIComponent(item.slug)}`}>
              <a>→ {item.title}</a>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
