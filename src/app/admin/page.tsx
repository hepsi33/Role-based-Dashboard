"use client";

import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, LogOut } from "lucide-react";

type PendingUser = {
    id: string;
    name: string;
    email: string;
    status: string;
    createdAt: string;
};

export default function AdminDashboard() {
    const { data: session } = useSession();
    const [pendingUsers, setPendingUsers] = useState<PendingUser[]>([]);

    useEffect(() => {
        fetchPendingUsers();
    }, []);

    const fetchPendingUsers = async () => {
        try {
            const res = await fetch("/api/admin/pending-users");
            if (res.ok) {
                const data = await res.json();
                setPendingUsers(data);
            }
        } catch (err) {
            console.error("Failed to fetch users");
        }
    };

    const handleAction = async (userId: string, action: "approve" | "reject") => {
        try {
            await fetch("/api/admin/approve-user", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, action }),
            });
            // Optimistic update
            setPendingUsers(prev => prev.filter(u => u.id !== userId));
        } catch (err) {
            console.error("Failed to update user");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <header className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Admin Dashboard</h1>
                    <p className="text-gray-500">Manage users and approvals</p>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-sm font-medium">{session?.user?.name}</span>
                    <Button variant="outline" size="sm" onClick={() => signOut({ callbackUrl: "/login" })}>
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign Out
                    </Button>
                </div>
            </header>

            <div className="grid gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Pending Approvals</CardTitle>
                        <CardDescription>Users waiting for access to the platform.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {pendingUsers.length === 0 ? (
                            <p className="text-center text-gray-500 py-8">No pending users found.</p>
                        ) : (
                            <div className="rounded-md border">
                                <table className="w-full caption-bottom text-sm text-left">
                                    <thead className="[&_tr]:border-b">
                                        <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                            <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Name</th>
                                            <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Email</th>
                                            <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Status</th>
                                            <th className="h-12 px-4 align-middle font-medium text-muted-foreground text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="[&_tr:last-child]:border-0">
                                        {pendingUsers.map((user) => (
                                            <tr key={user.id} className="border-b transition-colors hover:bg-muted/50">
                                                <td className="p-4 align-middle font-medium">{user.name}</td>
                                                <td className="p-4 align-middle">{user.email}</td>
                                                <td className="p-4 align-middle">
                                                    <span className="inline-flex items-center rounded-full border border-yellow-200 bg-yellow-50 px-2.5 py-0.5 text-xs font-semibold text-yellow-800">
                                                        {user.status}
                                                    </span>
                                                </td>
                                                <td className="p-4 align-middle text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Button size="sm" variant="default" className="bg-green-600 hover:bg-green-700" onClick={() => handleAction(user.id, "approve")}>
                                                            <CheckCircle className="w-4 h-4 mr-1" /> Approve
                                                        </Button>
                                                        <Button size="sm" variant="destructive" onClick={() => handleAction(user.id, "reject")}>
                                                            <XCircle className="w-4 h-4 mr-1" /> Reject
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
