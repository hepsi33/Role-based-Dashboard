import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AdminDashboardClient } from "./admin-client";

export default async function AdminDashboardPage() {
    const session = await auth();

    if (!session?.user) {
        redirect("/login");
    }

    if (session.user.role !== "admin") {
        redirect("/dashboard");
    }

    return <AdminDashboardClient />;
}
