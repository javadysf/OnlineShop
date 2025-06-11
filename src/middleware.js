import { NextResponse } from 'next/server';

// مسیرهایی که نیاز به احراز هویت دارند
const protectedRoutes = ['/profile', '/orders', '/checkout'];

// مسیرهایی که فقط برای کاربران مهمان قابل دسترس هستند
const guestRoutes = ['/login'];

export function middleware(request) {
  const token = request.cookies.get('auth-token')?.value;
  const { pathname } = request.nextUrl;

  // بررسی مسیرهای محافظت شده
  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // بررسی مسیرهای مهمان
  if (guestRoutes.includes(pathname)) {
    if (token) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [...protectedRoutes, ...guestRoutes]
}; 