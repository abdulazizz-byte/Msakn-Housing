import { NextRequest, NextResponse } from 'next/server';

const locales = ['ar', 'en'];
const defaultLocale = 'ar';

function getLocale(request: NextRequest): string {
  const acceptLang = request.headers.get('accept-language');
  if (acceptLang?.includes('en')) return 'en';
  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip static files and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/images') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Check if pathname already has a locale
  const hasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (hasLocale) {
    return NextResponse.next();
  }

  // Redirect to default locale
  const locale = getLocale(request);
  return NextResponse.redirect(
    new URL(`/${locale}${pathname}`, request.url)
  );
}

export const config = {
  matcher: ['/((?!_next|api|images|favicon.ico).*)'],
};
