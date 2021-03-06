import { prisma } from "../../../db/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {

    res.setHeader('Content-Type', 'application/json')
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Cache-Control', 's-maxage=1000000000000, stale-while-revalidate')

    const slug = req.query['slug']

    if (!slug || typeof slug !== 'string') {
        res.statusCode = 404
        res.send(JSON.stringify({ message: 'use a slug' }))

        return
    }

    
    const data = await prisma.shortLink.findFirst({
        where: {
            slug: {
                equals: slug
            }
        }
    })

    if (!data) {
        res.statusCode = 404

        res.send(JSON.stringify({ message: 'slug not found' }))

        return
    }

    return res.json(data)

}