"use client";

import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckCircle, XCircle, LogOut, Users, Shield, Clock, UserCheck, UserX, Activity } from "lucide-react";
import { BrowserCheck } from "@/components/browser-check";

type PendingUser = {
    id: string;
    name: string;
    email: string;
    status: string;
    createdAt: string;
};

type UserStats = {
    approved: number;
    pending: number;
    rejected: number;
    totalUsers: number;
    totalAdmins: number;
};

export function AdminDashboardClient() {
    const { data: session } = useSession();
    const [pendingUsers, setPendingUsers] = useState<PendingUser[]>([]);
    const [stats, setStats] = useState<UserStats | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setError(null);
            setLoading(true);

            // Fetch both pending users and stats in parallel
            const [usersRes, statsRes] = await Promise.all([
                fetch("/api/admin/pending-users"),
                fetch("/api/admin/stats")
            ]);

            if (usersRes.ok) {
                const data = await usersRes.json();
                setPendingUsers(data);
            } else {
                setError("Failed to fetch pending users.");
            }

            if (statsRes.ok) {
                const statsData = await statsRes.json();
                setStats(statsData);
            }
        } catch (err) {
            console.error("Failed to fetch data", err);
            setError("An unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    };

    const handleAction = async (userId: string, action: "approve" | "reject") => {
        try {
            setError(null);
            const res = await fetch("/api/admin/approve-user", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, action }),
            });

            if (!res.ok) {
                throw new Error("Failed to update user");
            }

            setPendingUsers(prev => prev.filter(u => u.id !== userId));
            // Refresh stats after action
            const statsRes = await fetch("/api/admin/stats");
            if (statsRes.ok) {
                setStats(await statsRes.json());
            }
        } catch (err) {
            console.error("Failed to update user", err);
            setError("Failed to perform action. Please try again.");
        }
    };

    return (
        <BrowserCheck>
            <div className="min-h-screen bg-[#0a0a0a]">
                <header className="bg-[#111111] border-b border-white/10 sticky top-0 z-10">
                    <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="bg-blue-500/20 p-2 rounded-lg">
                                <Shield className="w-5 h-5 text-blue-400" />
                            </div>
                            <div>
                                <h1 className="text-lg font-bold text-white">Admin Dashboard</h1>
                                <p className="text-xs text-gray-400">Manage users and approvals</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-sm font-medium text-gray-300">{session?.user?.name}</span>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={async () => {
                                    await signOut({ redirect: true, callbackUrl: "/login" });
                                }}
                                className="border-white/20 text-gray-300 hover:bg-white/10 hover:text-white"
                            >
                                <LogOut className="w-4 h-4 mr-2" />
                                Sign Out
                            </Button>
                        </div>
                    </div>
                </header>

                <main className="container mx-auto px-4 py-8">
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg mb-6 animate-fade-in">
                            <strong className="font-semibold">Error: </strong>
                            <span>{error}</span>
                        </div>
                    )}

                    {/* Stats Cards */}
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
                        <Card className="glass border-white/10">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-gray-300">Approved Users</CardTitle>
                                <UserCheck className="h-4 w-4 text-green-400" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-white">
                                    {loading ? "..." : stats?.approved ?? 0}
                                </div>
                                <p className="text-xs text-green-400">Active on dashboard</p>
                            </CardContent>
                        </Card>
                        <Card className="glass border-white/10">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-gray-300">Pending Users</CardTitle>
                                <Clock className="h-4 w-4 text-yellow-400" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-white">
                                    {loading ? "..." : stats?.pending ?? 0}
                                </div>
                                <p className="text-xs text-yellow-400">Awaiting approval</p>
                            </CardContent>
                        </Card>
                        <Card className="glass border-white/10">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-gray-300">Rejected Users</CardTitle>
                                <UserX className="h-4 w-4 text-red-400" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-white">
                                    {loading ? "..." : stats?.rejected ?? 0}
                                </div>
                                <p className="text-xs text-red-400">Access denied</p>
                            </CardContent>
                        </Card>
                        <Card className="glass border-white/10">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-gray-300">Total Users</CardTitle>
                                <Users className="h-4 w-4 text-blue-400" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-white">
                                    {loading ? "..." : stats?.totalUsers ?? 0}
                                </div>
                                <p className="text-xs text-blue-400">
                                    + {stats?.totalAdmins ?? 0} admin{(stats?.totalAdmins ?? 0) !== 1 ? 's' : ''}
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Pending Users Table */}
                    <Card className="glass border-white/10">
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <div className="bg-yellow-500/20 p-2 rounded-lg">
                                    <Clock className="w-5 h-5 text-yellow-400" />
                                </div>
                                <div>
                                    <CardTitle className="text-white">Pending Approvals</CardTitle>
                                    <CardDescription className="text-gray-400">Users waiting for access to the platform</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            {loading ? (
                                <div className="text-center py-12">
                                    <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                                    <p className="text-gray-400">Loading users...</p>
                                </div>
                            ) : pendingUsers.length === 0 ? (
                                <div className="text-center py-12 bg-white/5 rounded-lg border border-dashed border-white/20">
                                    <Users className="w-12 h-12 text-gray-500 mx-auto mb-3" />
                                    <p className="text-gray-400">No pending users found</p>
                                    <p className="text-gray-500 text-sm mt-1">All users have been reviewed</p>
                                </div>
                            ) : (
                                <div className="rounded-lg border border-white/10 overflow-hidden">
                                    <table className="w-full text-sm text-left">
                                        <thead className="bg-white/5">
                                            <tr>
                                                <th className="h-12 px-4 font-medium text-gray-400">Name</th>
                                                <th className="h-12 px-4 font-medium text-gray-400">Email</th>
                                                <th className="h-12 px-4 font-medium text-gray-400">Status</th>
                                                <th className="h-12 px-4 font-medium text-gray-400 text-right">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {pendingUsers.map((user) => (
                                                <tr key={user.id} className="border-t border-white/10 hover:bg-white/5 transition-colors">
                                                    <td className="p-4 font-medium text-white">{user.name}</td>
                                                    <td className="p-4 text-gray-300">{user.email}</td>
                                                    <td className="p-4">
                                                        <span className="inline-flex items-center rounded-full bg-yellow-500/20 px-2.5 py-0.5 text-xs font-semibold text-yellow-400 border border-yellow-500/30">
                                                            {user.status}
                                                        </span>
                                                    </td>
                                                    <td className="p-4 text-right">
                                                        <div className="flex justify-end gap-2">
                                                            <Button
                                                                size="sm"
                                                                className="bg-green-600 hover:bg-green-700 text-white"
                                                                onClick={() => handleAction(user.id, "approve")}
                                                            >
                                                                <CheckCircle className="w-4 h-4 mr-1" /> Approve
                                                            </Button>
                                                            <Button
                                                                size="sm"
                                                                variant="destructive"
                                                                className="bg-red-600 hover:bg-red-700"
                                                                onClick={() => handleAction(user.id, "reject")}
                                                            >
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
                </main>
            </div>
        </BrowserCheck>
    );
}
