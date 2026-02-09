"use client";

import { signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";

export function SignOutButton() {
    return (
        <Button
            variant="outline"
            size="sm"
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="border-white/20 text-gray-300 hover:bg-white/10 hover:text-white"
        >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
        </Button>
    );
}
