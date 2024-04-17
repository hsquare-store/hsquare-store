import { NextResponse, NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    if (request.nextUrl.pathname.startsWith('/api')) {
        const api_key: string | null = request.headers.get('x-api-key') ?? null;
        if (!api_key || api_key !== process.env.NEXT_PUBLIC_API_KEY) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }
    }
    else if (request.nextUrl.pathname.startsWith('/auth')) {
        if (request.nextUrl.pathname == "/auth/setup") {
            if (request.cookies.has("setup")) {
                return NextResponse.redirect(new URL("/web/home", request.url));
            }
            if (!request.cookies.has("user")) {
                return NextResponse.redirect(new URL("/auth/login", request.url));
            }
            return NextResponse.next()
        }
        if (request.nextUrl.pathname == "/auth/logout") {
            return NextResponse.next()
        }
        if (request.cookies.has("user")) {
            return NextResponse.redirect(new URL("/web/home", request.url));
        }
        if (request.nextUrl.pathname == "/auth/login") {
            return NextResponse.next()
        }
        if (request.nextUrl.pathname == "/auth/register") {
            return NextResponse.next()
        }
        return NextResponse.redirect(new URL("/auth/login", request.url));
    }
    else if (request.nextUrl.pathname.startsWith('/web')) {
        if (!request.cookies.has("user")) {
            return NextResponse.redirect(new URL(`/auth/login`, request.url))
        }
        if (!request.cookies.has("setup")) {
            return NextResponse.redirect(new URL(`/auth/setup`, request.url))
        }
    }
    else if (request.nextUrl.pathname == "/") {
        return NextResponse.redirect(new URL("/web/home", request.url));

    }
    return NextResponse.next();

}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ["/:path*"],
}