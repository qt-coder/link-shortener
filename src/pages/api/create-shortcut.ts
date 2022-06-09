import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../db/client";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        // Process a POST request
        const { slug, link } = JSON.parse(req.body)

        try {
            await prisma.shortLink.create({
                data: {
                    slug: slug,
                    url: link
                }
            })
        } catch (e) {
            res.statusCode = 400
            res.json({ message: 'error', status: 400 })
        }

        res.statusCode = 200
        res.json({ message: 'success', status: 200 })

    } else {
        res.statusCode = 400
        res.json({ message: 'error', status: 400 })
    }
}
  