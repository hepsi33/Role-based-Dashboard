import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Clock, ArrowLeft } from "lucide-react";

export default function PendingPage() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-[#0a0a0a]">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-900/10 via-transparent to-orange-900/10" />
            <Card className="w-[480px] glass border-white/10 shadow-2xl text-center relative z-10">
                <CardHeader className="space-y-4">
                    <div className="mx-auto bg-yellow-500/20 p-4 rounded-full">
                        <Clock className="w-12 h-12 text-yellow-400" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-white">Account Pending Approval</CardTitle>
                    <CardDescription className="text-gray-400 text-base">
                        Your account has been created successfully and is currently awaiting administrator approval.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                        <p className="text-gray-300 text-sm">
                            You will be able to access the dashboard once an admin reviews and approves your registration.
                            This usually takes 24-48 hours.
                        </p>
                    </div>
                    <Button asChild variant="outline" className="border-white/20 text-gray-300 hover:bg-white/10 hover:text-white">
                        <Link href="/login">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Return to Login
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
