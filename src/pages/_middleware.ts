import { NextFetchEvent, NextRequest, NextResponse } from "next/server";


export async function middleware(req: NextRequest, ev: NextFetchEvent) {

    if (req.nextUrl.pathname.startsWith('/api/get-url/') || req.nextUrl.pathname.startsWith('/')) {
        console.log('returning early')
        return
    }

    const slug = req.nextUrl.pathname.split('/').pop()

    const data = await (
        await fetch(`${req.nextUrl.origin}/api/get-url/${slug}`)
    ).json()

    if (data?.url) {
        return NextResponse.redirect(data.url)
    }
}