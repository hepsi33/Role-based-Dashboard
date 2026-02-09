import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
    const isLoggedIn = !!req.auth;
    const isAuthPage = req.nextUrl.pathname.startsWith("/login") || req.nextUrl.pathname.startsWith("/signup");
    const isDashboardPage = req.nextUrl.pathname.startsWith("/dashboard");
    const isAdminPage = req.nextUrl.pathname.startsWith("/admin");

    if (isAuthPage) {
        if (isLoggedIn) {
            return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
        }
        return null;
    }

    if (!isLoggedIn) {
        return NextResponse.redirect(new URL("/login", req.nextUrl));
    }

    if (isAdminPage && req.auth?.user?.role !== "admin") {
        return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
    }

    return null;
});

export const config = {
    matcher: ["/dashboard/:path*", "/admin/:path*", "/login", "/signup"],
};
