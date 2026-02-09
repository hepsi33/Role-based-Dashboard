import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { XCircle, ArrowLeft } from "lucide-react";

export default function AccessDeniedPage() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-[#0a0a0a]">
            <div className="absolute inset-0 bg-gradient-to-br from-red-900/10 via-transparent to-orange-900/10" />
            <Card className="w-[480px] glass border-white/10 shadow-2xl text-center relative z-10">
                <CardHeader className="space-y-4">
                    <div className="mx-auto bg-red-500/20 p-4 rounded-full">
                        <XCircle className="w-12 h-12 text-red-400" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-white">Access Denied</CardTitle>
                    <CardDescription className="text-gray-400 text-base">
                        Your account registration has been reviewed and was not approved by the administrator.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                        <p className="text-gray-300 text-sm">
                            If you believe this was a mistake, please contact the administrator or try registering with a different email address.
                        </p>
                    </div>
                    <div className="flex gap-3 justify-center">
                        <Button asChild variant="outline" className="border-white/20 text-gray-300 hover:bg-white/10 hover:text-white">
                            <Link href="/">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Go Home
                            </Link>
                        </Button>
                        <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
                            <Link href="/signup">
                                Try Again
                            </Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
