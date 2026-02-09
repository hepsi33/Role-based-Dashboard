"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { SignOutButton } from "@/components/sign-out-button";

export function NavButtons() {
    const { data: session } = useSession();
    const isLoggedIn = !!session?.user;
    const dashboardLink = session?.user?.role === "admin" ? "/admin" : "/dashboard";

    if (isLoggedIn) {
        return (
            <>
                <Button asChild variant="ghost" className="text-gray-300 hover:text-white hover:bg-white/10">
                    <Link href={dashboardLink}>Dashboard</Link>
                </Button>
                <SignOutButton />
            </>
        );
    }

    return (
        <>
            <Button asChild variant="ghost" className="text-gray-300 hover:text-white hover:bg-white/10">
                <Link href="/login">Login</Link>
            </Button>
            <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
                <Link href="/signup">Sign Up</Link>
            </Button>
        </>
    );
}

export function HeroButtons() {
    const { data: session } = useSession();
    const isLoggedIn = !!session?.user;
    const dashboardLink = session?.user?.role === "admin" ? "/admin" : "/dashboard";

    if (isLoggedIn) {
        return (
            <>
                <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8">
                    <Link href={dashboardLink}>Go to Dashboard</Link>
                </Button>
            </>
        );
    }

    return (
        <>
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8">
                <Link href="/signup">Get Started</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 px-8">
                <Link href="/get-started">Learn More</Link>
            </Button>
        </>
    );
}
