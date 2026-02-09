import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckCircle2, ShieldCheck, Zap, LayoutTemplate, ArrowRight } from "lucide-react";
import { NavButtons, HeroButtons } from "@/components/nav-buttons";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default function GetStartedPage() {
    return (
        <div className="min-h-screen bg-[#0a0a0a] flex flex-col">
            {/* Header */}
            <header className="px-4 md:px-6 h-16 flex items-center justify-between border-b border-white/10 bg-[#0a0a0a]/90 backdrop-blur-lg sticky top-0 z-50">
                <Link href="/" className="font-bold text-xl tracking-tight text-white">
                    Dashboard
                </Link>
                <div className="flex items-center gap-2">
                    <NavButtons />
                </div>
            </header>

            {/* Hero Section */}
            <main className="flex-1 container mx-auto px-4 py-8 md:py-20 flex flex-col items-center text-center">
                <div className="max-w-3xl space-y-4 md:space-y-6">
                    <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight text-white">
                        Everything you need to manage your <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">users</span>.
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl text-gray-400 leading-relaxed px-4">
                        A comprehensive dashboard solution featuring role-based access control,
                        secure authentication, and a premium user interface designed for modern applications.
                    </p>
                </div>

                {/* Feature Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16 w-full max-w-6xl">
                    <Card className="glass border-white/10 border-t-4 border-t-green-500">
                        <CardHeader>
                            <div className="p-3 w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center mb-4">
                                <ShieldCheck className="w-6 h-6 text-green-400" />
                            </div>
                            <CardTitle className="text-white">Secure Authentication</CardTitle>
                            <CardDescription className="text-gray-400">Enterprise-grade security</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-500">
                                Built with encryption, secure session management, and NextAuth.js to ensure your data stays safe.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="glass border-white/10 border-t-4 border-t-blue-500">
                        <CardHeader>
                            <div className="p-3 w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center mb-4">
                                <LayoutTemplate className="w-6 h-6 text-blue-400" />
                            </div>
                            <CardTitle className="text-white">Role-Based Access</CardTitle>
                            <CardDescription className="text-gray-400">Granular control</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-500">
                                Distinct Admin and User roles. Admins have full control over user approvals and management.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="glass border-white/10 border-t-4 border-t-purple-500">
                        <CardHeader>
                            <div className="p-3 w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center mb-4">
                                <Zap className="w-6 h-6 text-purple-400" />
                            </div>
                            <CardTitle className="text-white">Lightning Fast</CardTitle>
                            <CardDescription className="text-gray-400">Optimized performance</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-500">
                                Powered by Next.js and Neon Database for instant page loads and real-time data fetching.
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* How It Works */}
                <div className="mt-20 max-w-4xl w-full">
                    <h2 className="text-3xl font-bold mb-12 text-white text-center">How It Works</h2>
                    <div className="space-y-6">
                        <div className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-xl p-6">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500/20 text-blue-400 font-bold shrink-0">
                                1
                            </div>
                            <div>
                                <h3 className="font-bold text-white text-lg">Sign Up</h3>
                                <p className="text-gray-400 mt-1">Create an account with your email and password. Your data is encrypted and secure.</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-xl p-6">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-yellow-500/20 text-yellow-400 font-bold shrink-0">
                                2
                            </div>
                            <div>
                                <h3 className="font-bold text-white text-lg">Admin Approval</h3>
                                <p className="text-gray-400 mt-1">Your account is placed in a pending state until an administrator reviews and approves it.</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-xl p-6">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-500/20 text-green-400 font-bold shrink-0">
                                3
                            </div>
                            <div>
                                <h3 className="font-bold text-white text-lg">Access Dashboard</h3>
                                <p className="text-gray-400 mt-1">Once approved, log in to access your personalized dashboard and features.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className="mt-20 pb-10 max-w-2xl w-full">
                    <Card className="bg-gradient-to-r from-blue-600 to-purple-600 border-0 shadow-xl">
                        <CardHeader className="text-center">
                            <CardTitle className="text-2xl text-white">Ready to get started?</CardTitle>
                            <CardDescription className="text-blue-100">
                                Join thousands of users managing their workflow with Dashboard.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex justify-center gap-4">
                            <HeroButtons />
                        </CardContent>
                    </Card>
                </div>

            </main>
        </div>
    );
}
