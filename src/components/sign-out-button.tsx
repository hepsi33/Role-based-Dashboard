"use client";

import { logout } from "@/actions/auth";
import { Button } from "./ui/button";

export function SignOutButton() {
    return (
        <Button variant="ghost" onClick={() => logout()}>
            Sign Out
        </Button>
    );
}
