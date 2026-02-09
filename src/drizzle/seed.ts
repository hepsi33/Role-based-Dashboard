import dotenv from "dotenv";
dotenv.config({ path: ".env" });

import { db } from "../lib/db";
import { users } from "./schema";
import { hash } from "bcryptjs";
import { eq } from "drizzle-orm";

async function main() {
    const adminEmail = "admin@example.com";
    // Check existence
    const existingUsers = await db.select().from(users).where(eq(users.email, adminEmail));

    if (existingUsers.length === 0) {
        const passwordHash = await hash("admin123", 10);
        await db.insert(users).values({
            name: "Admin User",
            email: adminEmail,
            password: passwordHash,
            role: "admin",
            status: "approved",
        });
        console.log("Admin user seeded successfully");
    } else {
        console.log("Admin user already exists");
    }
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
