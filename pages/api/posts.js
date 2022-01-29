import { getPostNames } from "../../lib/post";

export default function handler(_, res) {
  res.status(200).json({ payload: getPostNames() });
}
