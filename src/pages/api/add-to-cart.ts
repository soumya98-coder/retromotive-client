import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const body = JSON.parse(req.body);
  try {
    const response = await fetch(
      "https://retromotive.co/wp-json/wc/store/cart/items",
      {
        method: "POST",
        body: JSON.stringify(body.body),
        headers: {
          "X-WC-Store-API-Nonce": body.nonce,
        },
      }
    );
    const data = await response.json();
    res.status(200).json({ data, nonce: response.headers.get("nonce") });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}