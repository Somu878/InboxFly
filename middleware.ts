import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  try {
    const token: any = await getToken({ req, secret: process.env.JWT_SECRET });

    const tokenExpiresAt = token?.expires;
    if (tokenExpiresAt * 1000 > Date.now()) {
      return NextResponse.next();
    }
  } catch (error) {
    return NextResponse.redirect(new URL("/api/auth/signin", req.url));
  }
}
