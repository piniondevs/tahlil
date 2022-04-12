import Head from "next/head";
import Link from "next/dist/client/link";

export default function Custom404() {
  return (
    <>
      <Head>
        <title>404</title>
      </Head>
      <div>
        <h1>404</h1>
        <p>I dont think that page exists :/</p>
      </div>
      <div>
        <Link href="/">
          <a>← go back to home</a>
        </Link>
      </div>
    </>
  );
}
