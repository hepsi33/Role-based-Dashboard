import Link from "next/link";
import { NavButtons, HeroButtons } from "@/components/nav-buttons";
import { Shield, Zap, Sparkles } from "lucide-react";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0a]">
      <header className="px-4 md:px-6 h-16 flex items-center justify-between sticky top-0 z-40 w-full border-b border-white/10 bg-[#0a0a0a]/90 backdrop-blur-lg">
        <Link className="flex items-center gap-2" href="/">
          <span className="font-bold text-xl tracking-tight text-white">Dashboard</span>
        </Link>
        <nav className="flex gap-4 sm:gap-6 items-center">
          <NavButtons />
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-20 md:py-32 lg:py-48 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-transparent to-purple-900/30" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl" />
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center space-y-8 text-center">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-white">
                  The Premium Dashboard <br />
                  <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">for Modern Teams</span>
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl">
                  Robust Role-Based Access Control. Secure Authentication. Beautifully Designed.
                </p>
              </div>
              <div className="flex gap-4">
                <HeroButtons />
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-16 md:py-24 border-t border-white/10">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 md:gap-12 md:grid-cols-3 text-center">
              <div className="space-y-3 p-6 rounded-xl bg-white/5 border border-white/10">
                <div className="mx-auto bg-green-500/20 p-3 rounded-full w-fit">
                  <Shield className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="font-bold text-xl text-white">Secure</h3>
                <p className="text-gray-400">Enterprise-grade security with NextAuth and BCrypt.</p>
              </div>
              <div className="space-y-3 p-6 rounded-xl bg-white/5 border border-white/10">
                <div className="mx-auto bg-blue-500/20 p-3 rounded-full w-fit">
                  <Zap className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="font-bold text-xl text-white">Fast</h3>
                <p className="text-gray-400">Built on Next.js and Neon DB for lightning performance.</p>
              </div>
              <div className="space-y-3 p-6 rounded-xl bg-white/5 border border-white/10">
                <div className="mx-auto bg-purple-500/20 p-3 rounded-full w-fit">
                  <Sparkles className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="font-bold text-xl text-white">Beautiful</h3>
                <p className="text-gray-400">Crafted with Tailwind CSS for a premium aesthetic.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-white/10">
        <p className="text-gray-500 text-sm">© 2024 Dashboard Inc. All rights reserved.</p>
      </footer>
    </div>
  );
}
