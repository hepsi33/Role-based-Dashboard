import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { users } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { UserDashboardClient } from "./dashboard-client";

export const dynamic = "force-dynamic";

export default async function UserDashboard() {
    const session = await auth();

    if (!session?.user) {
        redirect("/login");
    }

    const user = await db.query.users.findFirst({
        where: eq(users.id, session.user.id),
    });

    let displayName = user?.name || session.user.name || "User";
    if (!displayName.trim()) {
        displayName = "User";
    }

    return (
        <UserDashboardClient
            displayName={displayName}
            email={user?.email || session.user.email || ""}
        />
    );
}
