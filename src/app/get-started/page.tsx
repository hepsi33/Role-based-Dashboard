import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckCircle2, ShieldCheck, Zap, LayoutTemplate } from "lucide-react";
import { auth } from "@/lib/auth";
import { SignOutButton } from "@/components/sign-out-button";

export const dynamic = "force-dynamic";

export default async function GetStartedPage() {
    const session = await auth();
    const isLoggedIn = !!session?.user;
    const dashboardLink = session?.user?.role === "admin" ? "/admin" : "/dashboard";

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex flex-col">
            {/* Header */}
            <header className="px-4 md:px-6 h-16 flex items-center justify-between border-b bg-background/80 backdrop-blur-md sticky top-0 z-50">
                <Link href="/" className="font-bold text-xl tracking-tight">
                    Dashboard
                </Link>
                <div className="flex items-center gap-2">
                    {isLoggedIn ? (
                        <>
                            <Button asChild variant="ghost">
                                <Link href={dashboardLink}>Go to Dashboard</Link>
                            </Button>
                            <SignOutButton />
                        </>
                    ) : (
                        <>
                            <Button asChild variant="ghost">
                                <Link href="/login">Log In</Link>
                            </Button>
                            <Button asChild className="ml-2">
                                <Link href="/signup">Sign Up</Link>
                            </Button>
                        </>
                    )}
                </div>
            </header>

            {/* Rest of the component remains static, no session logic needed for content */}
            {/* Hero Section */}
            <main className="flex-1 container mx-auto px-4 py-8 md:py-20 flex flex-col items-center text-center">
                <div className="max-w-3xl space-y-4 md:space-y-6">
                    <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400">
                        Everything you need to manage your users.
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed px-4">
                        A comprehensive dashboard solution featuring role-based access control,
                        secure authentication, and a premium user interface designed for modern applications.
                    </p>
                </div>

                {/* Feature Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16 w-full max-w-6xl">
                    <Card className="glass border-t-4 border-t-primary-500">
                        <CardHeader>
                            <div className="p-2 w-12 h-12 rounded-lg bg-primary-100 dark:bg-primary-900 flex items-center justify-center mb-4">
                                <ShieldCheck className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                            </div>
                            <CardTitle>Secure Authentication</CardTitle>
                            <CardDescription>Enterprise-grade security</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-500">
                                Built with encryption, secure session management, and NextAuth.js to ensure your data stays safe.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="glass border-t-4 border-t-primary-500">
                        <CardHeader>
                            <div className="p-2 w-12 h-12 rounded-lg bg-primary-100 dark:bg-primary-900 flex items-center justify-center mb-4">
                                <LayoutTemplate className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                            </div>
                            <CardTitle>Role-Based Access</CardTitle>
                            <CardDescription>Granular control</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-500">
                                Distinct Admin and User roles. Admins have full control over user approvals and management.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="glass border-t-4 border-t-primary-500">
                        <CardHeader>
                            <div className="p-2 w-12 h-12 rounded-lg bg-primary-100 dark:bg-primary-900 flex items-center justify-center mb-4">
                                <Zap className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                            </div>
                            <CardTitle>Lightning Fast</CardTitle>
                            <CardDescription>Optimized performance</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-500">
                                Powered by Next.js 14 and Neon Database for instant page loads and real-time data fetching.
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* How It Works */}
                <div className="mt-20 max-w-4xl w-full text-left">
                    <h2 className="text-3xl font-bold mb-8 text-center">How It Works</h2>
                    <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">

                        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 group-[.is-active]:bg-primary-500 group-[.is-active]:text-emerald-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                                <CheckCircle2 className="w-5 h-5" />
                            </div>
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded border border-slate-200 bg-white shadow-sm">
                                <div className="flex items-center justify-between space-x-2 mb-1">
                                    <div className="font-bold text-slate-900">Sign Up</div>
                                </div>
                                <div className="text-slate-500">Create an account with your email and password. Your data is encrypted.</div>
                            </div>
                        </div>

                        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 group-[.is-active]:bg-primary-500 group-[.is-active]:text-emerald-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                                <CheckCircle2 className="w-5 h-5" />
                            </div>
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded border border-slate-200 bg-white shadow-sm">
                                <div className="flex items-center justify-between space-x-2 mb-1">
                                    <div className="font-bold text-slate-900">Admin Approval</div>
                                </div>
                                <div className="text-slate-500">Your account is placed in a pending state until an administrator reviews and approves it.</div>
                            </div>
                        </div>

                        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 group-[.is-active]:bg-primary-500 group-[.is-active]:text-emerald-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                                <CheckCircle2 className="w-5 h-5" />
                            </div>
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded border border-slate-200 bg-white shadow-sm">
                                <div className="flex items-center justify-between space-x-2 mb-1">
                                    <div className="font-bold text-slate-900">Access Dashboard</div>
                                </div>
                                <div className="text-slate-500">Once approved, log in to access your personalized dashboard and features.</div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* CTA */}
                <div className="mt-20 pb-10">
                    <Card className="bg-primary-600 text-white border-0 shadow-lg max-w-2xl">
                        <CardHeader>
                            <CardTitle className="text-2xl">Ready to get started?</CardTitle>
                            <CardDescription className="text-primary-100">
                                Join thousands of users managing their workflow with Dashboard.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {isLoggedIn ? (
                                <Button asChild size="lg" variant="secondary" className="w-full sm:w-auto font-bold">
                                    <Link href={dashboardLink}>Go to Dashboard</Link>
                                </Button>
                            ) : (
                                <Button asChild size="lg" variant="secondary" className="w-full sm:w-auto font-bold">
                                    <Link href="/signup">Create Account Now</Link>
                                </Button>
                            )}
                        </CardContent>
                    </Card>
                </div>

            </main>
        </div>
    );
}
