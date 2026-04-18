import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['zh', 'en', 'id'];
const defaultLocale = 'id';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. 检查路径是否已经包含 locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // 2. 如果不包含 locale，重定向到默认 locale
  // 特别处理根路径 / -> /id
  // 处理 /privacy -> /id/privacy
  // 处理 /terms -> /id/terms
  request.nextUrl.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // 排除所有内部路径 (_next, static, 等)
    '/((?!api|_next/static|_next/image|favicon.ico|images|public).*)',
  ],
};
