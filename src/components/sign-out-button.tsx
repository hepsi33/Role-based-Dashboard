"use client";

import { signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";

export function SignOutButton() {
    const handleSignOut = async () => {
        await signOut({ redirect: true, callbackUrl: "/login" });
    };

    return (
        <Button
            variant="outline"
            size="sm"
            onClick={handleSignOut}
            className="border-white/20 text-gray-300 hover:bg-white/10 hover:text-white"
        >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
        </Button>
    );
}
