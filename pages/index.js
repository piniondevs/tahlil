import React from "react";
import axios from "axios";
import Link from "next/link";

export async function getStaticProps() {
  const res = await axios.get("https://tahlils-blog.herokuapp.com/posts/");
  const posts = res.data;

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
      <h1>Hi</h1>
      <p>
        My names <strong>Tahlil</strong>, Im a self proclaimed software
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
