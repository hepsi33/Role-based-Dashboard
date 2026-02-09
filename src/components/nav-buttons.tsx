"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { SignOutButton } from "@/components/sign-out-button";

export function NavButtons() {
    const { data: session, status } = useSession();
    const isLoggedIn = !!session?.user;
    const dashboardLink = session?.user?.role === "admin" ? "/admin" : "/dashboard";

    console.log("[Client Render] NavButtons | Status:", status, "| LoggedIn:", isLoggedIn, "| Role:", session?.user?.role);

    if (isLoggedIn) {
        return (
            <>
                <Button asChild variant="ghost">
                    <Link href={dashboardLink}>Dashboard</Link>
                </Button>
                <SignOutButton />
            </>
        );
    }

    return (
        <Button asChild variant="ghost">
            <Link href="/login">Login</Link>
        </Button>
    );
}

export function HeroButtons() {
    const { data: session, status } = useSession();
    const isLoggedIn = !!session?.user;
    const dashboardLink = session?.user?.role === "admin" ? "/admin" : "/dashboard";

    console.log("[Client Render] HeroButtons | Status:", status, "| LoggedIn:", isLoggedIn);

    if (isLoggedIn) {
        return (
            <Button asChild size="lg" className="bg-white text-black hover:bg-gray-200">
                <Link href={dashboardLink}>Go to Dashboard</Link>
            </Button>
        );
    }

    return (
        <Button asChild size="lg" className="bg-white text-black hover:bg-gray-200">
            <Link href="/signup">Create Account</Link>
        </Button>
    );
}
