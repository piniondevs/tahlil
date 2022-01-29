import { getPostData } from "../../../lib/post";

export default function handler(req, res) {
  const { name } = req.query;
  res.status(200).json({ payload: getPostData(name) });
}
