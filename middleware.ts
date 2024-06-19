import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  try {
    const token: any = await getToken({ req, secret: process.env.JWT_SECRET });

    if (!token) {
      return NextResponse.redirect(new URL("/api/auth/signin", req.url));
    }
    const tokenExpiresAt = token?.expires;

    if (tokenExpiresAt * 1000 < Date.now()) {
      console.error("Token has expired");
      return NextResponse.redirect(new URL("/api/auth/signin", req.url));
    }

    return NextResponse.next();
  } catch (error) {
    return NextResponse.error();
  }
}

export const config = {
  matcher: ["/api"],
};
