import { NextRequest, NextResponse } from 'next/server';

const locales = ['en', 'lt'];
const defaultLocale = 'lt';

export default function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (pathnameHasLocale) return;

    request.nextUrl.pathname = `/${defaultLocale}${pathname}`;

    return NextResponse.redirect(request.nextUrl);
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|studio|favicon.ico|icons|manifest.json).*)',
    ],
};
