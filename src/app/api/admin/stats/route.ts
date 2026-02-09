import { db } from "@/lib/db";
import { users } from "@/drizzle/schema";
import { eq, sql } from "drizzle-orm";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function GET() {
    try {
        const session = await auth();

        if (!session?.user || session.user.role !== "admin") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Get counts for each status
        const [approvedCount] = await db
            .select({ count: sql<number>`count(*)` })
            .from(users)
            .where(eq(users.status, "approved"));

        const [pendingCount] = await db
            .select({ count: sql<number>`count(*)` })
            .from(users)
            .where(eq(users.status, "pending"));

        const [rejectedCount] = await db
            .select({ count: sql<number>`count(*)` })
            .from(users)
            .where(eq(users.status, "rejected"));

        // Get total users (excluding admins for "active" count)
        const [totalUsers] = await db
            .select({ count: sql<number>`count(*)` })
            .from(users)
            .where(eq(users.role, "user"));

        const [adminCount] = await db
            .select({ count: sql<number>`count(*)` })
            .from(users)
            .where(eq(users.role, "admin"));

        return NextResponse.json({
            approved: Number(approvedCount.count),
            pending: Number(pendingCount.count),
            rejected: Number(rejectedCount.count),
            totalUsers: Number(totalUsers.count),
            totalAdmins: Number(adminCount.count),
        });
    } catch (error) {
        console.error("Failed to fetch user stats:", error);
        return NextResponse.json(
            { error: "Failed to fetch statistics" },
            { status: 500 }
        );
    }
}
