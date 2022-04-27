import fs from "fs/promises";
import * as matter from "gray-matter";

export async function getPostMeta() {
  try {
    const fileNames = await fs.readdir("./_posts");

    const meta = await Promise.all(
      fileNames.map(async (item) => {
        const fileData = await fs.readFile(`./_posts/${item}`, "utf-8");
        const parsedData = matter(fileData);
        return parsedData;
      })
    );

    const data = meta.map((item) => {
      return {
        title: item.data.title,
        slug: item.data.slug,
        index: item.data.index,
      };
    });

    return data;
  } catch (err) {
    console.error(err);
    return;
  }
}

export async function getPostContent(fileName) {
  try {
    const data = await fs.readFile(`./_posts/${fileName}.md`, "utf-8");
    const parsed = matter(data);
    return parsed;
  } catch (err) {
    console.error(err);
    return;
  }
}
