import Link from "next/link";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { SignOutButton } from "@/components/sign-out-button";

export const dynamic = "force-dynamic";

export default async function Home() {
  const session = await auth();
  const isLoggedIn = !!session?.user;
  const dashboardLink = session?.user?.role === "admin" ? "/admin" : "/dashboard";

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 md:px-6 h-16 flex items-center justify-between sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 text-black dark:text-white">
        <Link className="flex items-center gap-2" href="#">
          <span className="font-bold text-xl tracking-tight">Dashboard</span>
        </Link>
        <nav className="flex gap-4 sm:gap-6 items-center">
          {isLoggedIn ? (
            <>
              <Link className="text-sm font-medium hover:underline underline-offset-4" href={dashboardLink}>
                Dashboard
              </Link>
              <SignOutButton />
            </>
          ) : (
            <Link className="text-sm font-medium hover:underline underline-offset-4" href="/login">
              Login
            </Link>
          )}
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-black">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
                  The Premium Dashboard <br /> for Modern Teams
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl">
                  Robust Role-Based Access Control. Secure Authentication. Beautifully Designed.
                </p>
              </div>
              <div className="space-x-4">
                {isLoggedIn ? (
                  <Button asChild size="lg" className="bg-white text-black hover:bg-gray-200">
                    <Link href={dashboardLink}>Go to Dashboard</Link>
                  </Button>
                ) : (
                  <Button asChild size="lg" className="bg-white text-black hover:bg-gray-200">
                    <Link href="/signup">Create Account</Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 sm:px-10 md:gap-16 md:grid-cols-3 text-center">
              <div className="space-y-2">
                <h3 className="font-bold text-xl">Secure</h3>
                <p className="text-muted-foreground">Enterprise-grade security with NextAuth and BCrypt.</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-xl">Fast</h3>
                <p className="text-muted-foreground">Built on Next.js 14 and Neon DB for lightning performance.</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-xl">Beautiful</h3>
                <p className="text-muted-foreground">Crafted with Tailwind CSS for a premium aesthetic.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t font-light text-sm">
        <p className="text-gray-500">© 2024 Dashboard Inc. All rights reserved.</p>
      </footer>
    </div>
  );
}
