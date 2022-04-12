import fs from "fs/promises";

export async function getPostNames() {
  try {
    const fileNames = await fs.readdir("./_posts");
    const postNames = fileNames.map((item) => item.split(".")[0]);
    return postNames;
  } catch (err) {
    console.error(err);
    return;
  }
}

export function getPostContent(fileName) {
  try {
    const data = fs.readFile(`./_posts/${fileName}.md`, "utf-8");
    return data;
  } catch (err) {
    console.error(err);
    return;
  }
}
