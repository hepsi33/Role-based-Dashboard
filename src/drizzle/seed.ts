import "dotenv/config";

import { db } from "../lib/db";
import { users } from "./schema";
import { hash } from "bcryptjs";
import { eq } from "drizzle-orm";

import * as readline from "readline";

async function askQuestion(query: string): Promise<string> {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise((resolve) => {
        rl.question(query, (ans) => {
            rl.close();
            resolve(ans);
        });
    });
}

async function main() {
    let adminEmail = process.argv[2];
    let adminPassword = process.argv[3];

    if (!adminEmail) {
        console.log("No email provided via command line arguments.");
        adminEmail = await askQuestion("Enter Admin Email (default: test@test.com): ");
    }

    if (!adminEmail) adminEmail = "test@test.com";

    if (!adminPassword) {
        // Don't log "No password provided", just ask if interactive, else default
        // But we can't easily detect interactive vs piped here without tty checks, sticking to simple prompt
        if (process.stdin.isTTY) {
            adminPassword = await askQuestion("Enter Admin Password (default: Test123@123): ");
        }
    }

    if (!adminPassword) adminPassword = "Test123@123";

    console.log(`Seeding admin user: ${adminEmail}`);

    const existingUsers = await db.select().from(users).where(eq(users.email, adminEmail));

    if (existingUsers.length === 0) {
        const passwordHash = await hash(adminPassword, 10);
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
