import React from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";

export default function Page() {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const router = useRouter();
  const { id } = router.query;

  React.useEffect(() => {
    if (!id) return;

    axios
      .get(`https://tahlils-blog.herokuapp.com/posts/${id}`)
      .then((res) => {
        console.log(res.data);
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [id]);

  if (loading) {
    return <p>loading</p>;
  } else {
    return (
      <>
        <Head>
          <title>{id}</title>
        </Head>
        <div>
          <Link href="/">
            <a>← home</a>
          </Link>
        </div>
        <div>
          <ReactMarkdown>{data}</ReactMarkdown>
        </div>
      </>
    );
  }
}
