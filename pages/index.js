import React from "react";
import Link from "next/link";
import Head from "next/head";
import { getPostNames } from "../lib/post";

export async function getStaticProps() {
  const posts = await getPostNames();
  return {
    props: {
      posts,
    },
  };
}

export default function Home({ posts }) {
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
      </Head>
      <h1>Hi</h1>
      <p>
        My names <strong>Tahlil</strong>, Im a self proclaimed software
        developer and I mainly work on mobile apps, websites and Discord bots. I
        also do other stuff from time to time.
      </p>

      <h2>Contact Me:</h2>
      {socials.reverse().map((item) => {
        return (
          <div className="link-container">
            <a href={item.url}>{item.name}</a>
          </div>
        );
      })}

      <h2>Blog Posts:</h2>
      {posts.map((item) => {
        return (
          <div className="link-container">
            <Link href={`/posts/${encodeURIComponent(item)}`}>
              <a>→ {item}</a>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
