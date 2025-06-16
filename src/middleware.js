import { NextResponse } from 'next/server';

// مسیرهایی که نیاز به احراز هویت دارند
const protectedRoutes = ['/profile', '/orders', '/cart'];

// مسیرهایی که فقط برای کاربران مهمان قابل دسترس هستند
const guestRoutes = ['/login', '/register'];

export function middleware(request) {
  const token = request.cookies.get('auth-token');
  const { pathname } = request.nextUrl;

  // مسیرهای محافظت شده
  const protectedRoutes = ['/profile', '/orders', '/cart'];
  
  // اگر مسیر محافظت شده است و توکن وجود ندارد
  if (protectedRoutes.includes(pathname) && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // اگر کاربر لاگین کرده و در صفحه login یا register است
  if (token && (pathname === '/login' || pathname === '/register')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

// مشخص کردن مسیرهایی که middleware باید روی آنها اجرا شود
export const config = {
  matcher: ['/profile/:path*', '/orders/:path*', '/cart/:path*', '/login', '/register']
}; 