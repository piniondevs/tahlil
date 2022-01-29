import fs from "fs";

export function getPostNames() {
  const data = fs.readdirSync("./posts", "utf8");
  return data.map((item) => {
    const base = item.split(".");
    base.pop();
    return base.join(" ");
  });
}

export function getPostData(fileName) {
  try {
    const data = fs.readFileSync(`./posts/${fileName}.md`, "utf8");
    return data;
  } catch (err) {
    console.error(err);
    return "Something went wrong or the post does not exist";
  }
}
